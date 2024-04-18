import groupModel from '../Controller/groups/group.model';
import groupBusiness from './group.business';
import splitTransactionModel from '../Controller/split-tranasaction/split-transaction.model'
import transactionSettlementModel from '../Controller/transaction-settlement/transaction-settlement.model'
import db from '../config/db';

async function loggedInUser(Google_id){
    return await getUserbyGoogleId(Google_id)
}

async function getGroupSummaryUsers(id, userid){
    var group = await groupModel.findOne({_id: id}).populate("members")
    var users = group.members.filter(user => user.uid !== userid.sub)
    return await users
}

async function getGroupSummary(id, userid){
    var paidbyfrom = 0
    var paidbyto = 0
    var [current_user] = await db.query("SELECT User_id, Name, Email, Phone, Picture FROM Users where Google_id = ?", [userid.sub])
    var users = []
    var userBalances = []
    if(id !== undefined){
        var group = await groupBusiness.getGroupbyId()
        users = group.members.filter(user => user.uid !== userid.sub)
        var slips = await splitTransactionModel.find({group_id: id}).populate("paidUser_id").populate("split_between").sort({created_on: -1});
        var settle = await transactionSettlementModel.find({group_id: id}).populate("settleTo_User").populate("settleBy_User").sort({created_on: -1});
    }else{
        var group = await groupModel.find().populate("members")
        group.forEach((res) => {
            res.members.forEach((member) => {
                if(users.filter(x => x.User_id == member.User_id) == false && member.User_id != current_user[0].User_id){
                    users.push(member)
                }
            })
        })
        var slips = await splitTransactionModel.find().populate("paidUser_id").populate("split_between").sort({created_on: -1});
        var settle = await transactionSettlementModel.find({}).populate("settleTo_User").populate("settleBy_User").sort({created_on: -1});
    }
    users.forEach((user) => {
        paidbyfrom = 0
        paidbyto = 0
        slips.forEach((ele) => {
            if(ele.paidUser_id.User_id == current_user[0].User_id && ele.split_between.some((sb) => sb.User_id == user.User_id)){
                paidbyfrom = paidbyfrom + (ele.amount/ele.split_between.length)
            }
            if(ele.paidUser_id.User_id == user.User_id && ele.split_between.some((sb) => sb.User_id == current_user[0].User_id)){
                paidbyto = paidbyto + (ele.amount/ele.split_between.length)
            }
        });
        var settleAmountFrom = 0
        var settleAmountTo = 0
        settle.forEach((set) => {
            if(set.settleTo_User.User_id == user.User_id){
                settleAmountFrom = settleAmountFrom + set.amount
            }
            if(set.settleBy_User.User_id == user.User_id){
                settleAmountTo = settleAmountTo + set.amount
            }
        })

        var userBalance = {
            user: user,
            balance: Math.round(paidbyfrom - paidbyto + settleAmountFrom - settleAmountTo)
        }
        userBalances.push(userBalance)
    })
    return await userBalances
}

async function checkUser(user){
    try{
        var existUser = await getUserbyGoogleId(user.sub)
        
        if(existUser != null){
            existUser.Last_login = new Date()
            await db.query(`
                UPDATE Users
                SET Last_login = ?
                WHERE User_id = ?
            `, [existUser.Last_login, existUser.User_id])
            return "User Already Exists"
        }else{
            var [usermax] = await db.query(`
                select max(User_id) as id from Users;
            `)
            
            await db.query(`
                INSERT into Users (Name, Email, User_id, Google_id, Phone, Picture, Last_login, Registered_on) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            `, [user.name, user.email, Number(usermax[0].id) + 1, user.sub, "", user.picture, new Date(), new Date()])
            return "New User Created"
        }
    }catch (error){
        console.log(error)
        return false;
    }
}

async function getUserbyGoogleId(Google_id){
    var [user] = await db.query(`
        SELECT User_id, Name, Email, Phone, Picture 
        FROM Users 
        WHERE Google_id = ?
    `, [Google_id])
    return user[0];
}

async function getUserbyId(User_id){
    var [user] = await db.query(`
        SELECT User_id, Name, Email, Phone, Picture 
        FROM Users 
        WHERE User_id = ?
    `, [User_id])
    return user[0];
}

async function updateUser(data, user){
    var existUser = await getUserbyGoogleId(user.sub)

    existUser.Name = data.Name
    existUser.Phone = data.Phone

    await db.query(`
        UPDATE Users
        SET Name = ?, Phone = ?
        WHERE User_id = ?
    `, [existUser.Name, existUser.Phone, existUser.User_id])

    return "User is Updated Successfully"
}

module.exports = {loggedInUser, getGroupSummary, getGroupSummaryUsers, checkUser, getUserbyGoogleId, getUserbyId, getUserbyGoogleId, updateUser}