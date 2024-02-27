using Microsoft.Extensions.Logging;
using Orien.PYS.Business.Models;
using Orien.PYS.Data;
using Orien.PYS.Data.Entity;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text.Json;

namespace Orien.PYS.Business.Service.Implementation
{
    public class GroupService : IGroupService
    {
        private readonly OrienPYSDbContext orienPYSDbContext;
        private readonly ICommonService commonService;
        private readonly ILogger<GroupService> logger;
        private readonly IEmailService emailService;

        public GroupService(
            OrienPYSDbContext orienPYSDbContext,
            ICommonService commonService,
            ILogger<GroupService> logger,
            IEmailService emailService
            )
        {
            this.orienPYSDbContext = orienPYSDbContext;
            this.commonService = commonService;
            this.logger = logger;
            this.emailService = emailService;
        }

        public List<User> GetUserInfoByGroup(string groupId, string userId)
        {
            try
            {
                this.logger.LogInformation("Start of GetUserInfoByGroup");
                this.logger.LogInformation($"GetUserInfoByGroup - groupId - {groupId}");
                this.logger.LogInformation($"GetUserInfoByGroup - userId - {userId}");

                List<User> users = this.orienPYSDbContext.Users.Where(u => this.orienPYSDbContext.Group_User
                    .Where(gu => gu.Group_UId == groupId)
                    .Select(gu => gu.User_UId)
                    .ToList().Contains(u.UId) && u.UId != userId).ToList();

                return users;
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                throw ex;
            }
        }

        public List<User> GetAllUserInfoByGroup(string groupId)
        {
            try
            {
                this.logger.LogInformation("Start of GetUserInfoByGroup");
                this.logger.LogInformation($"GetUserInfoByGroup - groupId - {groupId}");

                List<User> users = this.orienPYSDbContext.Users.Where(u => this.orienPYSDbContext.Group_User
                    .Where(gu => gu.Group_UId == groupId)
                    .Select(gu => gu.User_UId)
                    .ToList().Contains(u.UId)).ToList();

                return users;
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                throw ex;
            }
        }

        public GroupDetail GetGroupInfo(string groupId)
        {
            try
            {
                this.logger.LogInformation("Start of GetGroupInfo");
                this.logger.LogInformation($"GetGroupInfo - groupId - {groupId}");

                GroupDetail group = this.orienPYSDbContext.Groups.Where(g => g.UId == groupId).Select(x => new GroupDetail()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    UId = x.UId,
                    Admin = this.orienPYSDbContext.Users.Where(u => u.UId == x.Admin).First(),
                    Members = this.orienPYSDbContext.Users.Where(u => this.orienPYSDbContext.Group_User
                    .Where(g => g.Group_UId == x.UId)
                    .Select(g => g.User_UId)
                    .ToList()
                    .Contains(u.UId)).ToList(),
                    Created_on = x.Created_on,
                    Updated_on = x.Updated_on
                }).First();

                return group;
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                return null;
            }
        }

        public List<GroupDetail> GetGroup(string userId)
        {
            try
            {
                this.logger.LogInformation("Start of GetGroup");
                this.logger.LogInformation($"GetGroup - userId - {userId}");

                List<GroupDetail> groups = this.orienPYSDbContext.Groups
                    .Where(g => this.orienPYSDbContext.Group_User
                                    .Where(gu => gu.Group_UId == g.UId)
                                    .Select(gu => gu.User_UId).ToList().Contains(userId))
                    .Select(x => new GroupDetail()
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Description = x.Description,
                        UId = x.UId,
                        Admin = this.orienPYSDbContext.Users.Where(u => u.UId == x.Admin).First(),
                        Members = this.orienPYSDbContext.Users.Where(u => this.orienPYSDbContext.Group_User
                        .Where(g => g.Group_UId == x.UId)
                        .Select(g => g.User_UId)
                        .ToList()
                        .Contains(u.UId)).ToList(),
                        Created_on = x.Created_on,
                        Updated_on = x.Updated_on
                    }).ToList();

                return groups;
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                throw ex;
            }
        }

        public bool AddGroup(CreateGroup group, string userid)
        {
            try
            {
                this.logger.LogInformation("Start of AddGroup");
                this.logger.LogInformation($"AddGroup - userid - {userid}");
                var groupJson = JsonSerializer.Serialize(group);
                this.logger.LogInformation($"AddGroup - group - {groupJson}");

                var uid = this.commonService.GenerateUniqueRandomNumber();
                this.logger.LogInformation($"AddGroup - uid - {uid}");

                Group newGroup = new Group()
                {
                    Name = group.Name,
                    Description = group.Description,
                    UId = uid,
                    Admin = userid,
                    Created_on = DateTime.Now,
                    Updated_on = DateTime.Now
                };

                this.orienPYSDbContext.Groups.Add(newGroup);

                GroupMemberRelation groupMember = new GroupMemberRelation()
                {
                    Added_on = DateTime.Now,
                    Group_UId = uid,
                    User_UId = userid
                };

                this.orienPYSDbContext.Group_User.Add(groupMember);
                this.orienPYSDbContext.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                return false;
            }
        }

        public bool AddMemberinGroup(AddGroupMember addGroupMember)
        {
            try
            {
                this.logger.LogInformation("Start of AddMemberinGroup");
                var groupmemjson = JsonSerializer.Serialize(addGroupMember);
                this.logger.LogInformation($"AddMemberinGroup - addGroupMember - {groupmemjson}");

                var user = this.orienPYSDbContext.Users.First(x => x.Email == addGroupMember.Email);
                GroupMemberRelation groupmember = new GroupMemberRelation()
                {
                    Group_UId = addGroupMember.Group_Uid,
                    User_UId = user.UId
                };
                this.orienPYSDbContext.Group_User.Add(groupmember);
                this.orienPYSDbContext.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                return false;
            }
        }

        public bool RemoveMemberinGroup(RemoveGroupMember groupMember)
        {
            try
            {
                this.logger.LogInformation("Start of RemoveMemberinGroup");
                var groupMemberjson = JsonSerializer.Serialize(groupMember);
                this.logger.LogInformation($"RemoveMemberinGroup - groupMember - {groupMemberjson}");

                GroupMemberRelation groupUser = this.orienPYSDbContext.Group_User
                    .Where(gu => gu.Group_UId == groupMember.GroupId && gu.User_UId == groupMember.UserId)
                    .FirstOrDefault()!;

                this.orienPYSDbContext.Group_User.Remove(groupUser);
                this.orienPYSDbContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                return false;
            }
        }

        public async Task<ResponseData> SendInvitationOfGroup(SendGroupInvite sendGroupInvite)
        {
            ResponseData response = new ResponseData()
            {
                Response = ""
            };

            try
            {
                this.logger.LogInformation($"Start of SendInvitationOfGroup");
                var sendGroupInvitejson = JsonSerializer.Serialize(sendGroupInvite);
                this.logger.LogInformation($"Email Body: {sendGroupInvitejson}");

                var CheckExists = this.orienPYSDbContext.Group_Invitation
                    .Where(i => i.Group_UId == sendGroupInvite.Group_UId && i.Email == sendGroupInvite.Email).FirstOrDefault();

                if (CheckExists == null)
                {
                    Group group = this.orienPYSDbContext.Groups.Where(x => x.UId == sendGroupInvite.Group_UId).First();

                    var InviteId = this.commonService.GenerateUniqueRandomNumber();
                    sendGroupInvite.Body = "You have been invited to join the Group Name: <b>" + group.Name + "</b>. Please click on the below " +
                        "link to join the group by logging in using this email. <br><br> " +
                        "Group Link: https://payyourshare.azurewebsites.net/" + InviteId + "/" + sendGroupInvite.Group_UId + "/login " +
                        "<br><br> <b>Best Regards<br>Pay Your Share</b>";
                    sendGroupInvite.Subject = "Invitation to Join the Group";

                    InviteEmailBody emailBody = new InviteEmailBody()
                    {
                        Body = sendGroupInvite.Body,
                        Email = sendGroupInvite.Email,
                        Subject = sendGroupInvite.Subject,
                        isHtml = sendGroupInvite.IsHTML
                    };

                    var EmailSent = await this.emailService.SendInviteEmail(emailBody);

                    if (EmailSent == "Email Sent")
                    {
                        GroupInvitation groupInvitation = new GroupInvitation()
                        {
                            Id = 0,
                            Email = sendGroupInvite.Email,
                            Group_UId = sendGroupInvite.Group_UId,
                            Invite_UId = InviteId,
                            Subject = sendGroupInvite.Subject,
                            Body = sendGroupInvite.Body,
                            IsHTML = sendGroupInvite.IsHTML
                        };

                        this.orienPYSDbContext.Group_Invitation.Add(groupInvitation);
                        this.orienPYSDbContext.SaveChanges();
                        response.Response = "Invitation Sent Successfully";
                    }
                    else
                    {
                        response.Response = "Invitation Failed to Send";
                        response.Error = EmailSent;
                    }
                    this.logger.LogInformation(response.Response);
                    this.logger.LogInformation(response.Error);
                    return response;
                }
                else
                {
                    response.Response = "Invitation Link Already Sent";
                    this.logger.LogInformation(response.Response);
                    return response;
                }
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                response.Response = "Invitation Not Sent, Contact Administrator";
                response.Error = ex.Message;
                return response;
            }
        }
    }
}
