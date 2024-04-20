import groupModel from '../Controller/groups/group.model';
import groupInvitationModel from '../Controller/group-invitation/group-invitation.model';
import userModel from '../Controller/users/user.model';
import db from '../config/db';

async function getGroups(userToken) {
    var user = await getUserbyGoogleId(userToken.sub);
    var [groups] = await db.query(`
        SELECT g.* FROM Split_Group g
        LEFT JOIN Group_User gu on gu.Group_id = g.Group_id
        LEFT JOIN Users u on u.User_id = gu.User_id
        WHERE gu.User_id = ?
        order by g.Name
    `, [user.User_id])

    for (const group of groups) {
        var [members] = await db.query(`
            SELECT u.User_id, u.Name, u.Email, u.Phone, u.Picture FROM Users u
            LEFT JOIN Group_User gu on u.User_id = gu.User_id
            WHERE gu.Group_id = ?
        `, [group.Group_id])
        var admin = await getUserbyId(group.Admin)
        group['Members'] = members
        group['Admin'] = admin
    }

    return groups;
}

async function getGroupbyId(Group_id) {
    var [group] = await db.query(`
        SELECT * FROM Split_Group 
        WHERE Group_id = ?
    `, [Group_id])

    var admin = await getUserbyId(group[0].Admin)

    var [members] = await db.query(`
        SELECT u.User_id, u.Name, u.Email, u.Phone, u.Picture FROM users u
        LEFT JOIN Group_User gu on u.User_id = gu.User_id
        WHERE gu.Group_id = ?
        order by u.Name
    `, [group[0].Group_id])
    
    group[0].Admin = admin
    group[0]['Members'] = members
    
    return await group[0]
}

async function deleteGroup(Group_id, userGoogleid) {
    var [group] = await db.query(`
        SELECT * FROM Split_Group 
        WHERE Group_id = ?
    `, [Group_id])

    if(group[0] != null){
        var user = await getUserbyGoogleId(userGoogleid)
        if(group[0].Admin == user.User_id){
            await db.query("DELETE FROM Group_Invite WHERE Group_id = ?", [Group_id])
            await db.query("DELETE FROM Group_User WHERE Group_id = ?", [Group_id])
            await db.query("DELETE FROM Split_Group WHERE Group_id = ?", [Group_id])
            return "Group is Successfully Deleted"
        }else{
            return "You are not Authorized to delete the Group"
        }
    }else{
        return "Group failed to delete"
    }
}

async function createGroup(data){
    try{
        var [group] = await db.query(`
            INSERT INTO Split_Group (Name, Description, Admin, Created_on, Updated_on)
            VALUES(?, ?, ?, ?, ?)
        `, [data.Name, data.Description, data.Admin, new Date(), new Date()])

        await db.query(`
            INSERT INTO Group_User (Group_id, User_id, Added_on)
            VALUES(?, ?, ?)
        `, [group.insertId, data.Admin, new Date()])

        return true;
    }catch (error){
        console.log(error)
        return false;
    }
}

async function removeGroupMember(data, userGoogleid){
    try{
        var [group] = await db.query(`
            SELECT * FROM Split_Group 
            WHERE Group_id = ?
        `, [data.Group_id])

        var user = await getUserbyGoogleId(userGoogleid);
        var removeUser = await getUserbyId(data.User_id)

        if(group[0].Admin == user.User_id){
            await db.query("Delete FROM Group_User WHERE Group_id = ? AND User_id = ?", [data.Group_id, data.User_id])
            return removeUser.Name + " is Successfully Removed"
        }else{
            return "You are not Authorized to delete the Group"
        }
    }catch(error){
        console.log(error)
        return false;
    }
}

async function addGroupMembers(data, userId){
    var user = await getUserbyGoogleId(userId)
    var group = await getGroupbyId(data.group)
    var userExits = group.Members.some(res => res.User_id == user.User_id)
    if(userExits){
        return "You Already exits in the Group"
    }else{
        // group.members.push(user._id)
        // var validlink = await groupInvitationModel.findOne({invite_uid: data.invite, group_uid: data.group, email: user.email})
        var [validlink] = await db.query(`
            SELECT * FROM Group_Invite 
            WHERE Invite_id = ? AND Group_id = ? AND Email = ?
        `, [data.invite, data.group, user.Email])
        
        if(validlink[0] != null){
            
            await db.query(`
                INSERT INTO Group_User ( Group_id, User_id, Added_on ) 
                VALUES ( ?, ?, ? )
            `, [group.Group_id, user.User_id, new Date()])
            return "You have been successfully added to the Group"

        }else{
            return "Invitation Link is Invalid";
        }
    }
}

async function getUserbyGoogleId(Google_id){
    var [user] = await db.query(`
        SELECT User_id, Name, Email, Phone, Picture 
        FROM Users 
        WHERE Google_id = ?
    `, [Google_id])
    return user[0];
}

async function getUserbyId(User_id){
    var [user] = await db.query(`
        SELECT User_id, Name, Email, Phone, Picture 
        FROM Users 
        WHERE User_id = ?
    `, [User_id])
    return user[0];
}

module.exports = {getGroups, createGroup, removeGroupMember, addGroupMembers, getGroupbyId, deleteGroup}