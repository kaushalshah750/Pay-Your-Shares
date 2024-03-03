import splitTransactionEmailModel from '../Controller/split-transaction-email/split-transaction-email.model';
import emailBusiness from './email.business';
import userModel from '../Controller/users/user.model';


async function storeEmailData(data){
  var user = await userModel.findById({_id: data.user})
  await emailBusiness.sendEmail(user.email, data.subject, data.body)
  var emaildata = new splitTransactionEmailModel(data)
  return await emaildata.save();
}

module.exports = { storeEmailData };
