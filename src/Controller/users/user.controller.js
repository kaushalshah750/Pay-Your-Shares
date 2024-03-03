import userBusiness from '../../Business/user.business';
import responsedata from '../../Utils/response';

exports.loggedInUser = (req, res) => {
    userBusiness.loggedInUser({uid: req.user.sub})
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}

exports.getGroupSummaryUsers = (req, res) => {
    userBusiness.getGroupSummaryUsers(req.params.id, req.user)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null));
}