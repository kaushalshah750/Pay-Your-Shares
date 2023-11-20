using Microsoft.AspNetCore.Mvc;
using Orien.PYS.Business.Models;
using Orien.PYS.Business.Service;
using Orien.PYS.Data;
using Orien.PYS.Data.Entity;

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

        [HttpGet]
        public SlipTransactionVM GetallSlipTransaction()
        {
            var test = new SlipTransactionVM()
            {
                Name = this.orienPYSDbContext.SlipTransactions.Where(x => x.Slip_Id == 2).Select(x => x.Name).AsEnumerable().First(),
                Amount = this.orienPYSDbContext.SlipTransactions.Where(x => x.Slip_Id == 1).Select(x => x.Amount).AsEnumerable().First(),
                Users = this.orienPYSDbContext.Users.Where(x => x.Id == this.orienPYSDbContext.SplitRelations.Where(sr => sr.UserId == x.Id).Select(sr => sr.UserId).FirstOrDefault()).AsEnumerable().ToList()
            };

            return test;
        }
    }
}
