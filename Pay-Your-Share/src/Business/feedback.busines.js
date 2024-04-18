import db from '../config/db';

async function createFeedback(data){
    try{
        await db.query(`
            INSERT INTO Feedbacks ( User_id, Feedback, Created_on)
            VALUES (?, ?, ?);
        `, [data.User_id, data.Feedback, new Date(data.Created_on)])
        return true;
    }catch (error){
        console.log(error)
        return false;
    }
}

module.exports = {createFeedback}