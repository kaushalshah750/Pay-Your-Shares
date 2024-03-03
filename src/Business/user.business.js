import userModel from '../Controller/users/user.model';
import groupModel from '../Controller/groups/group.model';

async function loggedInUser(query){
    return await userModel.findOne(query);
}

async function getGroupSummaryUsers(id, userid){
    var group = await groupModel.findOne({_id: id}).populate("members")
    var users = group.members.filter(user => user.uid !== userid.sub)
    return await users
}

module.exports = {loggedInUser, getGroupSummaryUsers}