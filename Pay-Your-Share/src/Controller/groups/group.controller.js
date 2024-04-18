import groupbusiness from '../../Business/group.business'
import responsedata from '../../Utils/response'

exports.getAll = (req, res) => {
    groupbusiness.getGroups(req.user)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null))
};

exports.getGroupbyId = (req, res) => {
    groupbusiness.getGroupbyId(req.params.id)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null))
};

exports.deleteGroup = (req, res) => {
    groupbusiness.deleteGroup(req.params.id, req.user.sub)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null))
};

exports.creategroup = (req, res) => {
    groupbusiness.createGroup(req.body)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null))
};

exports.removeGroupMember = (req, res) => {
    groupbusiness.removeGroupMember(req.body, req.user.sub)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null))
};

exports.addGroupMembers = (req, res) => {
    groupbusiness.addGroupMembers(req.body, req.user.sub)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null))
};