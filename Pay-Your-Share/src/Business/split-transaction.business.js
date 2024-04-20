import db from '../config/db';

// async function getSplitTransactionsbyId(query){
//     return await splitTransactionModel.findOne(query)
//         .populate("paidUser_id")
//         .populate("addedBy_id")
//         .populate("split_between").sort({created_on: -1});
// }

async function getSplitTransactions(userGoogleId, transaction){
    try{
        var [user] = await db.query(`
            SELECT * FROM Users 
            WHERE Google_id = ?
        `, [userGoogleId])

        var [group] = await db.query(`
            SELECT * FROM Split_Group 
            WHERE Group_id = ?
        `, [transaction.group])
        
        var [admin] = await db.query(`
            SELECT User_id, Name, Email, Phone, Picture FROM Users 
            WHERE User_id = ?
        `, [group[0].Admin])
        
        var [Members] = await db.query(`
            SELECT u.User_id, u.Name, u.Email, u.Phone, u.Picture FROM Group_User gu
            LEFT JOIN Users u on u.User_id = gu.User_id
            WHERE gu.Group_id = ?
        `, [group[0].Group_id])
        
        var [tranasactions] = await db.query(`
            SELECT distinct st.Slip_id, st.Name, st.Amount, st.PaidBy_id, st.AddedBy_id, st.Payment_date, st.Updated_on FROM Split_Transaction st
            LEFT JOIN Split_Between sb on sb.Slip_id = st.Slip_id
            WHERE st.Group_id = ? and (sb.User_id = ? OR st.PaidBy_id = ? OR st.AddedBy_id = ?)
            ORDER BY st.Updated_on DESC
        `, [transaction.group, user[0].User_id, user[0].User_id, user[0].User_id])

        for (const tranasaction of tranasactions) {
            var [AddedBy] = await db.query(`
                SELECT User_id, Name, Email, Phone, Picture 
                FROM Users 
                WHERE User_id = ?
            `, [tranasaction.AddedBy_id])
            
            var [PaidBy] = await db.query(`
                SELECT User_id, Name, Email, Phone, Picture 
                FROM Users 
                WHERE User_id = ?
            `, [tranasaction.PaidBy_id])
            
            var [SplitBetween] = await db.query(`
                SELECT u.User_id, u.Name, u.Email, u.Phone, u.Picture FROM Split_Between sb
                LEFT JOIN Users u on u.User_id = sb.User_id
                WHERE Slip_id = ?
            `, [tranasaction.Slip_id])

            tranasaction['Split_between'] = SplitBetween
            tranasaction.AddedBy_id = AddedBy[0]
            tranasaction.PaidBy_id = PaidBy[0]
        }
        
        group[0].Admin = admin[0]
        group[0]['Members'] = Members
        
        var payment = {
            Group: group[0],
            Transaction: tranasactions
        }
        return payment    

    }catch(error){
        console.log(error)
        return false;
    }
}

async function createSplitTransaction(transaction){
    try{
        var [split] = await db.query(`
            INSERT INTO Split_Transaction (Name, Amount, PaidBy_id, AddedBy_id, Group_id, Payment_date, Created_on, Updated_on) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [transaction.Name, transaction.Amount, transaction.PaidBy_id, transaction.AddedBy_id, transaction.Group_id, new Date(transaction.Payment_date), new Date(), new Date()])
        
        for (const sb of transaction.Split_between){
            await db.query(`
                INSERT INTO Split_Between (Slip_id, User_id) 
                VALUES (?, ?)
            `, [split.insertId, sb])
        }
        return true;
    }catch(error){
        console.log(error)
        return false;
    }
}

async function deleteSplitTransaction(Slip_id){
    try{
        await db.query(`
            DELETE FROM Split_Between 
            WHERE Slip_id = ?
        `, [Number(Slip_id)])

        await db.query(`
            DELETE FROM Split_Transaction 
            WHERE Slip_id = ?
        `, [Number(Slip_id)])

        return true;
    }catch(error){
        console.log(error)
        return false;
    }
}

module.exports = {createSplitTransaction, getSplitTransactions, deleteSplitTransaction}