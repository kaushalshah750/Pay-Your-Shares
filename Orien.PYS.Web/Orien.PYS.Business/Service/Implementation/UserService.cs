using Orien.PYS.Data;
using Orien.PYS.Data.Entity;

namespace Orien.PYS.Business.Service.Implementation
{
    public class UserService : IUserService
    {
        private readonly OrienPYSDbContext dbContext;

        public UserService(
            OrienPYSDbContext dbContext
            )
        {
            this.dbContext = dbContext;
        }

        public List<User> GetUserbyGroup(string groupId)
        {
            List<User> users = this.dbContext.Users
                .Where(u =>
                        this.dbContext.Group_User
                            .Where(g => g.Group_UId == groupId)
                            .Select(g => g.User_UId)
                            .ToList()
                            .Contains(u.UId))
                .ToList();

            return users;
        }
    }
}
