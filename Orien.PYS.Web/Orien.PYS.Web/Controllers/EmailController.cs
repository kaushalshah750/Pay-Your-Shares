using Microsoft.AspNetCore.Mvc;
using Orien.PYS.Business.Models;
using Orien.PYS.Business.Service;

namespace Orien.PYS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService emailService;

        public EmailController(
            IEmailService emailService
            )
        {
            this.emailService = emailService;
        }

        [HttpPost]
        public Task<bool> SendEmail(EmailBody emailBody)
        {
            return this.emailService.SendEmail(emailBody);
        }
    }
}
