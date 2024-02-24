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
                var userExists = this.dbContext.Users.Where(u => u.UId == userDetail.uid).FirstOrDefault();

                if(userExists != null)
                {
                    userExists.Name = userDetail.name;
                    userExists.Picture = userDetail.picture;
                    this.dbContext.SaveChanges();

                    return "User Already Exists";
                }
                else
                {
                    User user = new User()
                    {
                        Id = 0,
                        Name = userDetail.name,
                        Email = userDetail.email,
                        Phone = "",
                        Picture = userDetail.picture,
                        UId = userDetail.uid
                    };

                    this.dbContext.Users.Add(user);
                    this.dbContext.SaveChanges();
                    return "New User Created";
                }
            }
            catch
            {
                return "There is some issue with the service.";
            }
        }
    }
}
