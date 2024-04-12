import userModel from '../Controller/users/user.model';
import groupModel from '../Controller/groups/group.model';
import splitTransactionModel from '../Controller/split-tranasaction/split-transaction.model'
import transactionSettlementModel from '../Controller/transaction-settlement/transaction-settlement.model'

async function loggedInUser(query){
    return await userModel.findOne(query);
}

async function getGroupSummaryUsers(id, userid){
    var group = await groupModel.findOne({_id: id}).populate("members")
    var users = group.members.filter(user => user.uid !== userid.sub)
    return await users
}

async function getGroupSummary(id, userid){
    var paidbyfrom = 0
    var paidbyto = 0
    var current_user = await userModel.findOne({uid: userid.sub})
    var users = []
    var userBalances = []
    if(id !== undefined){
        var group = await groupModel.findOne({_id: id}).populate("members")
        users = group.members.filter(user => user.uid !== userid.sub)
        var slips = await splitTransactionModel.find({group_id: id}).populate("paidUser_id").populate("split_between").sort({created_on: -1});
        var settle = await transactionSettlementModel.find({group_id: id}).populate("settleTo_User").populate("settleBy_User").sort({created_on: -1});
    }else{
        var group = await groupModel.find().populate("members")
        group.forEach((res) => {
            res.members.forEach((member) => {
                if(users.filter(x => x.uid == member.uid) == false && member.uid != current_user.uid){
                    users.push(member)
                }
            })
        })
        var slips = await splitTransactionModel.find().populate("paidUser_id").populate("split_between").sort({created_on: -1});
        var settle = await transactionSettlementModel.find({settleBy_User: current_user._id}).populate("settleTo_User").populate("settleBy_User").sort({created_on: -1});
    }
    users.forEach((user) => {
        paidbyfrom = 0
        paidbyto = 0
        slips.forEach((ele) => {
            if(ele.paidUser_id.uid == current_user.uid && ele.split_between.some((sb) => sb.uid == user.uid)){
                paidbyfrom = paidbyfrom + (ele.amount/ele.split_between.length)
            }
            if(ele.paidUser_id.uid == user.uid && ele.split_between.some((sb) => sb.uid == current_user.uid)){
                paidbyto = paidbyto + (ele.amount/ele.split_between.length)
            }
        });
        var settleAmountFrom = 0
        var settleAmountTo = 0
        settle.forEach((set) => {
            if(set.settleTo_User.uid == user.uid){
                settleAmountFrom = settleAmountFrom + set.amount
            }
            if(set.settleBy_User.uid == user.uid){
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
    var newUser = await userModel.findOne({uid: user.sub})
    if(newUser != null){
        newUser.last_login = new Date()
        await userModel.findOneAndUpdate({_id: newUser._id}, newUser)
        return "User Already Exists"
    }else{
        var newUserData = {
            name: user.name,
            email: user.email,
            uid: user.sub,
            picture: user.picture,
            phone: "",
            registered_on: new Date(),
            last_login: new Date()
        }
        
        var newUserModel = userModel(newUserData);
        await newUserModel.save();
        return "New User Created"
    }
}

async function updateUser(data, user){
    var users = await userModel.findOne({uid: user.sub})
    users.name = data.name
    users.phone = data.phone
    await userModel.findOneAndUpdate({uid: user.sub}, users)
    return "User is Updated Successfully"
}

module.exports = {loggedInUser, getGroupSummary, getGroupSummaryUsers, checkUser, updateUser}