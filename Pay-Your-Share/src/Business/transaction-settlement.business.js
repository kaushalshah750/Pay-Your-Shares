import db from '../config/db';

async function getTransactionsSummary(user_uid, transaction){

    var [group] = await db.query(`
        SELECT * FROM Split_Group 
        WHERE Group_id = ?
    `, [transaction.group])

    var user = await getUserbyGoogleId(user_uid)
    
    var [tranasactions] = await db.query(`
        SELECT * FROM Transaction_Settlement 
        WHERE Group_id = ? AND (SettleBy_id = ? OR SettleTo_id = ?)
    `, [transaction.group, user.User_id, user.User_id])
    
    for (var trans of tranasactions){
        trans.SettleBy_id = await getUserbyId(trans.SettleBy_id)
        trans.SettleTo_id = await getUserbyId(trans.SettleTo_id)
    }
    // var group = await groupBusiness.getGroupbyId(transaction.group)
    // var user = userBusiness.getUserbyGoogleId(user_uid)
    // var tranasactions = await transactionSettlementModel.find({type: transaction.type, group_id: transaction.group})
    //     .populate("settleBy_User")
    //     .populate("settleTo_User")
    //     .populate("addedBy_id")
    //     .populate("group_id").sort({created_on: -1});
    var payment = {
        group: group[0],
        transaction: tranasactions
    }
    return payment
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

async function settleTransaction(user_uid, transaction){
    try{
        var [current_user] = await db.query(`
            SELECT User_id, Name, Email, Phone, Picture 
            FROM Users 
            WHERE Google_id = ?
        `, [user_uid])
        
        var settlement = {
            Amount: transaction.Amount,
            SettleBy_id: transaction.Action == "Me" ? transaction.SettleTo_id.User_id : current_user[0].User_id,
            SettleTo_id: transaction.Action == "Me" ? current_user[0].User_id : transaction.SettleTo_id.User_id,
            AddedBy_id: current_user[0].User_id,
            Group_id: transaction.Group_id.Group_id,
            Payment_date: new Date(),
            Created_on: new Date(),
            Updated_on: new Date()
        }

        await db.query(`
            INSERT INTO Transaction_Settlement ( Amount, SettleBy_id, SettleTo_id, AddedBy_id, Group_id, Payment_date, Created_on, Updated_on ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [settlement.Amount, settlement.SettleBy_id, settlement.SettleTo_id, settlement.AddedBy_id, settlement.Group_id, settlement.Payment_date, settlement.Created_on, settlement.Updated_on])

        return true;
    } catch (error){
        console.log(error)
        return false;
    }
}

module.exports = { getTransactionsSummary, settleTransaction }