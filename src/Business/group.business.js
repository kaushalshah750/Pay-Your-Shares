import groupModel from '../Controller/groups/group.model';
import groupInvitationModel from '../Controller/group-invitation/group-invitation.model';
import userModel from '../Controller/users/user.model';

async function getGroups(userToken) {
    var user = await userModel.findOne({uid: userToken.sub})
    return await groupModel.find({"members": { $in: [user._id] }})
        .populate("admin").populate("members")
}

async function getGroupbyId(query) {
    return await groupModel.findOne(query)
        .populate("admin").populate("members")
}

async function deleteGroup(query, user) {
    var group = await groupModel.findOne(query);
    if(group != null){
        var user = await userModel.findOne({uid: user.sub})
        if(group.admin.equals(user._id)){
            await groupModel.findOneAndDelete(query);
            return "Group is Successfully Deleted"
        }else{
            return "You are not Authorized to delete the Group"
        }
    }else{
        return "Group failed to delete"
    }
}

async function createGroup(data){
    var group = new groupModel(data)
    return await group.save()
}

async function modifyGroupMembers(data){
    var members = {
        "members": data.members
    }
    return await groupModel.findOneAndUpdate({_id: data._id}, members, null)
}

async function addGroupMembers(data, userId){
    var user = await userModel.findOne({uid: userId})
    var group = await groupModel.findOne({_id: data.group})
    group.members.push(user._id)
    var validlink = await groupInvitationModel.findOne({invite_uid: data.invite, group_uid: data.group, email: user.email})
    if(validlink != null){
        await groupModel.findOneAndUpdate({_id: group._id}, group)
        return "You have been successfully added to the Group"
    }else{
        return "Invitation Link is Invalid";
    }
}

module.exports = {getGroups, createGroup, modifyGroupMembers, addGroupMembers, getGroupbyId, deleteGroup}