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

async function checkUser(user){
    var newUser = await userModel.findOne({uid: user.sub})
    if(newUser != null){
        return "User Already Exists"
    }else{
        var newUserData = {
            name: user.name,
            email: user.email,
            uid: user.sub,
            picture: user.picture,
            phone: ""
        }

        var newUserModel = userModel(newUserData);
        await newUserModel.save();
        return "New User Created"
    }
}

module.exports = {loggedInUser, getGroupSummaryUsers, checkUser}