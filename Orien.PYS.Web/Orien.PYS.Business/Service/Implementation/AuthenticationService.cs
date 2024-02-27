using Microsoft.Extensions.Logging;
using Orien.PYS.Business.Models;
using Orien.PYS.Data;
using Orien.PYS.Data.Entity;
using System.Text.Json;

namespace Orien.PYS.Business.Service.Implementation
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly OrienPYSDbContext dbContext;
        private readonly ILogger<AuthenticationService> logger;

        public AuthenticationService(
            OrienPYSDbContext dbContext,
            ILogger<AuthenticationService> logger
            )
        {
            this.dbContext = dbContext;
            this.logger = logger;
        }

        public string CheckUser(UserDetail userDetail)
        {
            try
            {
                if (userDetail.Group_UId != "" && userDetail.Invite_UId != "")
                {
                    var ValidInvite = this.dbContext.Group_Invitation
                        .Where(i => i.Group_UId == userDetail.Group_UId && i.Invite_UId == userDetail.Invite_UId && i.Email == userDetail.Email)
                        .FirstOrDefault();

                    if (ValidInvite != null)
                    {
                        GroupMemberRelation groupMember = new GroupMemberRelation()
                        {
                            Added_on = DateTime.Now,
                            Group_UId = userDetail.Group_UId,
                            User_UId = userDetail.UId
                        };

                        this.dbContext.Group_User.Add(groupMember);
                        this.dbContext.SaveChanges();

                        return ValidateUser(userDetail);
                    }
                    else
                    {
                        return "Invite is InValid";
                    }
                }
                else
                {
                    return ValidateUser(userDetail);
                }

            }
            catch
            {
                return "There is some issue with the service.";
            }
        }

        public string ValidateUser(UserDetail userDetail)
        {
            try
            {
                this.logger.LogInformation("Start of ValidateUser");
                var userDetailjson = JsonSerializer.Serialize(userDetail);
                this.logger.LogInformation($"ValidateUser - userDetail - {userDetailjson}");

                var userExists = this.dbContext.Users.Where(u => u.UId == userDetail.UId).FirstOrDefault();

                if (userExists != null)
                {
                    userExists.Name = userDetail.Name;
                    userExists.Picture = userDetail.Picture;
                    this.dbContext.SaveChanges();

                    return "User Already Exists";
                }
                else
                {
                    User user = new User()
                    {
                        Id = 0,
                        Name = userDetail.Name,
                        Email = userDetail.Email,
                        Phone = "",
                        Picture = userDetail.Picture,
                        UId = userDetail.UId
                    };

                    this.dbContext.Users.Add(user);
                    this.dbContext.SaveChanges();
                    return "New User Created";
                }
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                throw ex;
            }
        }
    }
}
