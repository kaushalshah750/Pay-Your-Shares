import groupInviteBusiness from '../../../Business/group-invitation.business';
import responsedata from '../../../Utils/response'

exports.getGroupInvitationDetail = (req, res) => {
    groupInviteBusiness.getGroupInvitationDetail(req.params.id, req.params.groupId)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null))
}