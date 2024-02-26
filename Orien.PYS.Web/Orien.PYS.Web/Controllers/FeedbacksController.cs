using Microsoft.AspNetCore.Mvc;
using Orien.PYS.Business.Models;
using Orien.PYS.Business.Service;
using Orien.PYS.Data.Entity;
using System.IdentityModel.Tokens.Jwt;

namespace Orien.PYS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbacksController : ControllerBase
    {
        private readonly IFeedbackService feedbackService;

        public FeedbacksController(
            IFeedbackService feedbackService
            )
        {
            this.feedbackService = feedbackService;
        }

        [HttpPost]
        public bool CreateFeedback(FeedbackData feedback)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler().ReadJwtToken(token);
            var UserId = handler.Claims.First(x => x.Type == "sub").Value;

            return this.feedbackService.CreateFeedback(feedback, UserId);
        }
    }
}
