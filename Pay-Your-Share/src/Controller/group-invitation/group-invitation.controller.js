import groupInviteBusiness from '../../Business/group-invitation.business';
import responsedata from '../../Utils/response'

exports.sendGroupInvitation = (req, res) => {
    groupInviteBusiness.sendGroupInvitation(req.body, req.params.id, req.user.sub)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null))
}