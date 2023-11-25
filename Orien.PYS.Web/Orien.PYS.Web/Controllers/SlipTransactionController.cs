using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
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

        [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:Scopes")]
        [Authorize]
        [HttpGet("users")]
        public List<User> GetUserList()
        {
            return this.orienPYSDbContext.Users.AsEnumerable().ToList();
        }

        [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:Scopes")]
        [Authorize]
        [HttpPost("add-slip")]
        public void AddSlip(AddSlip addSlip)
        {
            //var slip = this.orienPYSDbContext.SlipTransactions.ToList();

            SlipTransaction SlipTransaction = new SlipTransaction()
            {
                Name = addSlip.Name,
                Amount = addSlip.Amount,
                //Slip_Id = slip.Count == 0 ? 1 : this.orienPYSDbContext.SlipTransactions.Select(x => x.Id).Max() + 1,
                Slip_Id = this.orienPYSDbContext.SlipTransactions.Select(x => x.Id).Max() + 1,
                PaidByUserId = addSlip.PaidByUserId,
                AddedBy = this.orienPYSDbContext.Users.Where(u => u.AzureID == addSlip.AzureId).Select(u => u.Id).First(),
                PaymentDate = addSlip.TransactionDate,
                UpdatedDate = DateTime.Now
            };

            this.orienPYSDbContext.SlipTransactions.Add(SlipTransaction);

            for(var i = 0; i < addSlip.Users.Length; i++)
            {
                SplitRelation splitRelation = new SplitRelation()
                {
                    Slip_Id = SlipTransaction.Slip_Id,
                    UserId = addSlip.Users[i]
                };

                this.orienPYSDbContext.SplitRelations.Add(splitRelation);
            }

            this.orienPYSDbContext.SaveChanges();
        }

        [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:Scopes")]
        [Authorize]
        [HttpGet]
        public List<SlipTransactionVM> GetallSlipTransaction(string userid)
        {

            List<SlipTransactionVM> sliptransaction = this.orienPYSDbContext.SlipTransactions.Select(x => new SlipTransactionVM()
            {
                Slip_Id = x.Slip_Id,
                Name = x.Name,
                Amount  = x.Amount,
                Paid_By = this.orienPYSDbContext.Users.Where(u => u.Id == x.PaidByUserId).AsEnumerable().FirstOrDefault(),
                TransactionDate = x.PaymentDate,
                Users = this.orienPYSDbContext.SplitRelations.Where(sr => sr.Slip_Id  == x.Slip_Id).Select(sr => new User()
                {
                    Id = this.orienPYSDbContext.Users.Where(u => u.Id == sr.UserId).Select(u => u.Id).AsEnumerable().FirstOrDefault(),
                    Name = this.orienPYSDbContext.Users.Where(u => u.Id == sr.UserId).Select(u => u.Name).AsEnumerable().FirstOrDefault(),
                    Email = this.orienPYSDbContext.Users.Where(u => u.Id == sr.UserId).Select(u => u.Email).AsEnumerable().FirstOrDefault(),
                }).ToList()
            }).OrderByDescending(x => x.TransactionDate).ToList();

            return sliptransaction;
        }
    }
}
