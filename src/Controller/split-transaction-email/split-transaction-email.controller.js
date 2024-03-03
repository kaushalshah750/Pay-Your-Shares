import emailBusiness from '../../Business/email.business';
import responseData from '../../Utils/response';

exports.sendEmail = (req, res) => {
    emailBusiness.storeEmailData(req.body)
        .then(data => responseData(res, false, "", data))
        .catch(err => responseData(res, true, err, null))
}
