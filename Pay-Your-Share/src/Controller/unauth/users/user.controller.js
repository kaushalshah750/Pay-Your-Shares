import userBusiness from '../../../Business/user.business';
import responsedata from '../../../Utils/response';

exports.loggedInUser = (req, res) => {
    userBusiness.loggedInUser("105832569567590837538")
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}
