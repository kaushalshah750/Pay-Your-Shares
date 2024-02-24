using Orien.PYS.Data.Entity;

namespace Orien.PYS.Business.Service
{
    public interface IUserService
    {
        public List<User> GetUserbyGroup(string groupId);
    }
}
