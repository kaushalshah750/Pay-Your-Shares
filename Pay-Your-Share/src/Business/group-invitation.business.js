import emailBusiness from './email.business';
import properties from '../config/properties';
import db from '../config/db';

async function getGroupInvitationDetail(inviteCode, groupId) {
    var [email] = await db.query('SELECT Email FROM Group_Invite WHERE Invite_id = ? and Group_id = ?', [inviteCode, groupId])
    if (email.length == 0) {
        return false;
    }
    return email[0].Email
}

async function sendGroupInvitation(data, groupId, userId) {
    try {
        var [groups] = await db.query(`
            SELECT * FROM Split_Group 
            WHERE Group_id = ?
        `, [groupId])

        var group = groups[0]
        var user = await getUserbyGoogleId(userId)
        var inviteId = await generateUniqueRandomNumber()
        var emailData = {
            Email: data.Email,
            Invited_by: user.User_id,
            Invite_id: inviteId,
            Group_id: groupId,
            Subject: "Invitation to Join the Group",
            Body: "You have been invited to join the Group Name: <b>" + group.Name + "</b>. Please click on the below " +
                "link to join the group by logging in using this email. <br><br> " +
                "Group Link: " + properties.BaseUrl + inviteId + "/" + groupId + "/login " +
                "<br><br> <b>Best Regards<br>Pay Your Share</b>"
        }
        await emailBusiness.sendEmail(emailData.Email, emailData.Subject, emailData.Body)

        await db.query(`
            INSERT INTO Group_Invite ( Email, Invite_id, Invited_by, Group_id, Subject, Body ) 
            VALUES ( ?, ?, ?, ?, ?, ?)
        `, [emailData.Email, inviteId, emailData.Invited_by, emailData.Group_id, emailData.Subject, emailData.Body])

        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}



async function getUserbyGoogleId(Google_id) {
    var [user] = await db.query(`
        SELECT User_id, Name, Email, Phone, Picture 
        FROM Users 
        WHERE Google_id = ?
    `, [Google_id])
    return user[0];
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
            // const groupExists = await groupInviteModel.findOne({ invite_uid: finalString });
            const [groupExists] = await db.query(`
                SELECT * FROM Group_Invite 
                WHERE Invite_id = ?
            `, [finalString]);

            // If the string does not exist in the database, set isUnique to true to exit the loop
            if (!groupExists[0]) {
                isUnique = true;
            }
        } catch (error) {
            console.error("Error checking uniqueness:", error);
            throw error; // Handle or throw error as needed
        }
    }

    return finalString;
}

module.exports = { sendGroupInvitation, getGroupInvitationDetail }