import groupbusiness from '../../Business/group.business'
import responsedata from '../../Utils/response'

exports.getAll = (req, res) => {
    groupbusiness.getGroups()
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null))
};

exports.getGroupbyId = (req, res) => {
    groupbusiness.getGroupbyId({_id:req.params.id})
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null))
};

exports.creategroup = (req, res) => {
    groupbusiness.createGroup(req.body)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null))
};

exports.modifyGroupMembers = (req, res) => {
    groupbusiness.modifyGroupMembers(req.body)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null))
};

exports.addGroupMembers = (req, res) => {
    groupbusiness.addGroupMembers(req.body, req.user.sub)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null))
};