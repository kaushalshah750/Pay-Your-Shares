using Orien.PYS.Business.Models;
using Orien.PYS.Data;
using Orien.PYS.Data.Entity;

namespace Orien.PYS.Business.Service.Implementation
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly OrienPYSDbContext dbContext;

        public AuthenticationService(
            OrienPYSDbContext dbContext
            )
        {
            this.dbContext = dbContext;
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
    }
}
