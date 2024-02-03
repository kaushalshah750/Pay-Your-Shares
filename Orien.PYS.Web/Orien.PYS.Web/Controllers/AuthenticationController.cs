using Microsoft.AspNetCore.Mvc;
using Orien.PYS.Business.Models;
using Orien.PYS.Business.Service;

namespace Orien.PYS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService authenticationService;

        public AuthenticationController(
            IAuthenticationService authenticationService
            )
        {
            this.authenticationService = authenticationService;
        }

        [HttpPost("check-user")]
        public string CheckUser(UserDetail userDetail)
        {
            return this.authenticationService.CheckUser(userDetail);
        }
    }
}
