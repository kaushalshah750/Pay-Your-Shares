using Orien.PYS.Business.Models;

namespace Orien.PYS.Business.Service
{
    public interface IAuthenticationService
    {
        public string CheckUser(UserDetail userDetail);
    }
}
