using Microsoft.Extensions.Logging;
using Orien.PYS.Data;
using Orien.PYS.Data.Entity;

namespace Orien.PYS.Business.Service.Implementation
{
    public class UserService : IUserService
    {
        private readonly OrienPYSDbContext dbContext;
        private readonly ILogger<UserService> logger;

        public UserService(
            OrienPYSDbContext dbContext,
            ILogger<UserService> logger
            )
        {
            this.dbContext = dbContext;
            this.logger = logger;
        }

        public List<User> GetUserbyGroup(string groupId)
        {
            try
            {
                this.logger.LogInformation("Start of GetUserbyGroup");
                this.logger.LogInformation($"GetUserbyGroup - groupId - {groupId}");

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
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                throw ex;
            }
        }
    }
}
