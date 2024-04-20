import db from '../config/db';

async function loggedInUser(Google_id){
    return await getUserbyGoogleId(Google_id)
}

// async function getGroupSummaryUsers(id, userid){
//     var group = await groupModel.findOne({_id: id}).populate("members")
//     var users = group.members.filter(user => user.uid !== userid.sub)
//     return await users
// }

async function getGroupSummary(id, userid){
    var paidbyfrom = 0
    var paidbyto = 0
    var current_user = await getUserbyGoogleId(userid.sub);
    var users = []
    var userBalances = []
    if(id !== undefined){
        var group = await getGroupbyId(id)
        users = group.Members.filter(user => user.User_id !== current_user.User_id)

        var [slips] = await db.query(`
            SELECT Slip_id, Name, Amount, PaidBy_id, AddedBy_id, Payment_date FROM Split_Transaction
            WHERE Group_id = ?
        `, [id]);

        
        for (const slip of slips) {
            var [SplitBetween] = await db.query(`
                SELECT u.User_id, u.Name, u.Email, u.Phone, u.Picture FROM Split_Between sb
                LEFT JOIN Users u on u.User_id = sb.User_id
                WHERE Slip_id = ?
            `, [slip.Slip_id])

            var [PaidBy] = await db.query(`
                SELECT User_id, Name, Email, Phone, Picture 
                FROM Users 
                WHERE User_id = ?
            `, [slip.PaidBy_id])

            slip.PaidBy_id = PaidBy[0]
            slip['Split_between'] = SplitBetween
        }

        var [settlements] = await db.query(`
            SELECT Trans_id, Amount, SettleBy_id, SettleTo_id, AddedBy_id, Group_id, Payment_date, Created_on, Updated_on FROM Transaction_Settlement
            WHERE Group_id = ?
        `, [id]);

        for (const settlement of settlements) {

            var [SettleTo_id] = await db.query(`
                SELECT User_id, Name, Email, Phone, Picture 
                FROM Users 
                WHERE User_id = ?
            `, [settlement.SettleTo_id])

            var [SettleBy_id] = await db.query(`
                SELECT User_id, Name, Email, Phone, Picture 
                FROM Users 
                WHERE User_id = ?
            `, [settlement.SettleBy_id])

            settlement.SettleBy_id = SettleBy_id[0]
            settlement.SettleTo_id = SettleTo_id[0]
        }
    }else{
        var group = await getGroupbyId(id)
        group.forEach((res) => {
            res.members.forEach((member) => {
                if(users.filter(x => x.User_id == member.User_id) == false && member.User_id != current_user.User_id){
                    users.push(member)
                }
            })
        })
        var [slips] = await db.query(`
            SELECT Slip_id, Name, Amount, PaidBy_id, AddedBy_id, Payment_date FROM Split_Transaction
        `);
        
        for (const slip of slips) {
            var [SplitBetween] = await db.query(`
                SELECT u.User_id, u.Name, u.Email, u.Phone, u.Picture FROM Split_Between sb
                LEFT JOIN Users u on u.User_id = sb.User_id
                WHERE Slip_id = ?
            `, [slip.Slip_id])

            var [PaidBy] = await db.query(`
                SELECT User_id, Name, Email, Phone, Picture 
                FROM Users 
                WHERE User_id = ?
            `, [slip.PaidBy_id])

            slip.PaidBy_id = PaidBy[0]
            slip['Split_between'] = SplitBetween
        }


        var [settlements] = await db.query(`
            SELECT Trans_id, Amount, SettleBy_id, SettleTo_id, AddedBy_id, Group_id, Payment_date, Created_on, Updated_on FROM Transaction_Settlement
        `);

        for (const settlement of settlements) {

            var [SettleTo_id] = await db.query(`
                SELECT User_id, Name, Email, Phone, Picture 
                FROM Users 
                WHERE User_id = ?
            `, [settlement.SettleTo_id])

            var [SettleBy_id] = await db.query(`
                SELECT User_id, Name, Email, Phone, Picture 
                FROM Users 
                WHERE User_id = ?
            `, [settlement.SettleBy_id])

            slip.SettleBy_id = SettleBy_id[0]
            slip.SettleTo_id = SettleTo_id[0]
        }

    }

    users.forEach((user) => {
        paidbyfrom = 0
        paidbyto = 0
        slips.forEach((ele) => {
            if(ele.PaidBy_id.User_id == current_user.User_id && ele.Split_between.some((sb) => sb.User_id == user.User_id)){
                paidbyfrom = paidbyfrom + (ele.Amount/ele.Split_between.length)
            }
            if(ele.PaidBy_id.User_id == user.User_id && ele.Split_between.some((sb) => sb.User_id == current_user.User_id)){
                paidbyto = paidbyto + (ele.Amount/ele.Split_between.length)
            }
        });
        var settleAmountFrom = 0
        var settleAmountTo = 0
        settlements.forEach((set) => {
            if(set.SettleTo_id.User_id == user.User_id){
                settleAmountFrom = settleAmountFrom + Number(set.Amount)
            }
            if(set.SettleBy_id.User_id == user.User_id){
                settleAmountTo = settleAmountTo + Number(set.Amount)
            }
        })

        var userBalance = {
            user: user,
            balance: Math.round((paidbyfrom - paidbyto) + (settleAmountFrom - settleAmountTo))
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

async function getGroupbyId(Group_id) {
    var [group] = await db.query(`
        SELECT * FROM Split_Group 
        WHERE Group_id = ?
    `, [Group_id])
    
    var admin = await getUserbyId(group[0].Admin)

    var [members] = await db.query(`
        SELECT u.User_id, u.Name, u.Email, u.Phone, u.Picture FROM users u
        LEFT JOIN Group_User gu on u.User_id = gu.User_id
        WHERE gu.Group_id = ?
        order by u.Name
    `, [group[0].Group_id])
    
    group[0].Admin = admin[0]
    group[0]['Members'] = members
    
    return await group[0]
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

module.exports = {loggedInUser, getGroupSummary, checkUser, getUserbyGoogleId, getUserbyId, getUserbyGoogleId, updateUser}