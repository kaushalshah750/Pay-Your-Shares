import groupInviteModel from '../Controller/group-invitation/group-invitation.model';
import groupModel from '../Controller/groups/group.model';
import userModel from '../Controller/users/user.model';
import emailBusiness from './email.business';
import properties from '../config/properties';

async function sendGroupInvitation(data, groupId, userId){
    var group = await groupModel.findOne({_id: groupId})
    var user = await userModel.findOne({uid: userId})
    var inviteId = await generateUniqueRandomNumber()
    var emailData = {
        email: data.email,
        invited_by: user._id,
        invite_uid: inviteId,
        group_uid: groupId,
        subject: "Invitation to Join the Group",
        body: "You have been invited to join the Group Name: <b>" + group.name + "</b>. Please click on the below " +
        "link to join the group by logging in using this email. <br><br> " +
        "Group Link: " + properties.BaseUrl + inviteId + "/" + groupId + "/login " +
        "<br><br> <b>Best Regards<br>Pay Your Share</b>"
    }
    await emailBusiness.sendEmail(emailData.email, emailData.subject, emailData.body)
    var groupInviteModelData = new groupInviteModel(emailData);
    return await groupInviteModelData.save();
}


async function generateUniqueRandomNumber() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let finalString = "";
    let isUnique = false;

    while (!isUnique) {
        let stringChars = Array(24).fill().map(() => chars.charAt(Math.floor(Math.random() * chars.length)));
        finalString = stringChars.join('');

        try {
            // Check if the generated string already exists in the database
            const groupExists = await groupInviteModel.findOne({ invite_uid: finalString });

            // If the string does not exist in the database, set isUnique to true to exit the loop
            if (!groupExists) {
                isUnique = true;
            }
        } catch (error) {
            console.error("Error checking uniqueness:", error);
            throw error; // Handle or throw error as needed
        }
    }

    return finalString;
}

module.exports = { sendGroupInvitation }