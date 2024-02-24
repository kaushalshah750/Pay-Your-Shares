using Microsoft.AspNetCore.Mvc;
using Orien.PYS.Business.Models;
using Orien.PYS.Business.Service;
using Orien.PYS.Data;
using Orien.PYS.Data.Entity;
using System.IdentityModel.Tokens.Jwt;

namespace Orien.PYS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SlipTransactionController : ControllerBase
    {
        private readonly ISlipTransactionService slipTransactionService;
        private readonly OrienPYSDbContext orienPYSDbContext;

        public SlipTransactionController(
            ISlipTransactionService slipTransactionService,
            OrienPYSDbContext orienPYSDbContext
            )
        {
            this.slipTransactionService = slipTransactionService;
            this.orienPYSDbContext = orienPYSDbContext;
        }

        [HttpGet("users")]
        public List<User> GetUserList()
        {
            return this.orienPYSDbContext.Users.AsEnumerable().ToList();
        }

        [HttpGet("user")]
        public User GetUser()
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler().ReadJwtToken(token);
            var userid = handler.Claims.First(x => x.Type == "sub").Value;
            return this.orienPYSDbContext.Users.Where(u => u.UId == userid).AsEnumerable().First();
        }

        [HttpGet("other-users")]
        public List<User> GetOtherUsersList()
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler().ReadJwtToken(token);
            var userid = handler.Claims.First(x => x.Type == "sub").Value;
            return this.orienPYSDbContext.Users.Where(u => u.UId != userid).AsEnumerable().ToList();
        }

        [HttpPost("add-slip")]
        public bool AddSlip(AddSlip addSlip)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler().ReadJwtToken(token);
            var userid = handler.Claims.First(x => x.Type == "sub").Value;

            return this.slipTransactionService.AddSlip(addSlip, userid);
        }

        [HttpGet]
        public List<SlipTransactionVM> GetallSlipTransaction(string groupId)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler().ReadJwtToken(token);
            var userid = handler.Claims.First(x => x.Type == "sub").Value;
            return this.slipTransactionService.GetallSlipTransaction(userid, groupId);
        }

        [HttpDelete("{slipid}")]
        public bool DeleteSlipPayment(int slipid)
        {
            return this.slipTransactionService.DeleteSlipTransaction(slipid);
        }
    }
}
