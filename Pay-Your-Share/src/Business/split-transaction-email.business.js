import emailBusiness from './email.business';
import db from '../config/db';

async function storeEmailData(data){
  try{
    var user = await getUserbyId(data.User)
    await emailBusiness.sendEmail(user.Email, data.Subject, data.Body)
    return true;
  }catch(error){
    console.log(error)
    return false;
  }
}

async function getUserbyId(User_id){
  var [user] = await db.query(`
      SELECT User_id, Name, Email, Phone, Picture 
      FROM Users 
      WHERE User_id = ?
  `, [User_id])
  return user[0];
}

module.exports = { storeEmailData };
