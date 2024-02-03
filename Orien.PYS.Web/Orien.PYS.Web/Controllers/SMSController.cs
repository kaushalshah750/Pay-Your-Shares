using Microsoft.AspNetCore.Mvc;
using Orien.PYS.Business.Models;
using Orien.PYS.Business.Service;

namespace Orien.PYS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SMSController : ControllerBase
    {
        private readonly ISMSService sMSService;

        public SMSController(
            ISMSService sMSService
            )
        {
            this.sMSService = sMSService;
        }

        [HttpPost]
        public string SendSMS(SMSBody sMSBody)
        {
            return this.sMSService.SendSMS(sMSBody);
        }
    }
}
