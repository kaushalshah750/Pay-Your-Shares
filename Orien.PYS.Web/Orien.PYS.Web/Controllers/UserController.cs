using Microsoft.AspNetCore.Mvc;
using Orien.PYS.Business.Service;
using Orien.PYS.Data.Entity;

namespace Orien.PYS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(
            IUserService userService
            )
        {
            this.userService = userService;
        }

        [HttpGet("group/{groupId}")]
        public List<User> GetUserbyGroup(string groupId)
        {
            return this.userService.GetUserbyGroup(groupId);
        }
    }
}
