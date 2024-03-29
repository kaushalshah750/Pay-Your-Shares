﻿using Microsoft.AspNetCore.Authorization;
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
        [HttpGet("user")]
        public User GetUser([FromQuery] string azureId)
        {
            return this.orienPYSDbContext.Users.Where(u => u.AzureID == azureId).AsEnumerable().First();
        }

        [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:Scopes")]
        [Authorize]
        [HttpGet("other-users")]
        public List<User> GetOtherUsersList([FromQuery] string azureId)
        {
            return this.orienPYSDbContext.Users.Where(u => u.AzureID != azureId).AsEnumerable().ToList();
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
                Slip_Id = 0,
                PaidByUserId = addSlip.PaidByUserId,
                AddedBy = this.orienPYSDbContext.Users.Where(u => u.AzureID == addSlip.AzureId).Select(u => u.Id).First(),
                PaymentDate = addSlip.TransactionDate,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            };

            this.orienPYSDbContext.SlipTransactions.Add(SlipTransaction);
            this.orienPYSDbContext.SaveChanges();

            SlipTransaction.Slip_Id = SlipTransaction.Id;
            this.orienPYSDbContext.SaveChanges();

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
            var user = this.orienPYSDbContext.Users.Where(u => u.AzureID == userid).First();

            List<SlipTransactionVM> sliptransaction = this.orienPYSDbContext.SlipTransactions
                .Where(st => st.PaidByUserId == user.Id || st.AddedBy == user.Id || this.orienPYSDbContext.SplitRelations.Where(sr => sr.Slip_Id == st.Slip_Id).Select(sr => sr.UserId).ToList().Contains(user.Id))
                .Select(x => new SlipTransactionVM()
            {
                Slip_Id = x.Slip_Id,
                Name = x.Name,
                Amount  = x.Amount,
                Paid_By = this.orienPYSDbContext.Users.Where(u => u.Id == x.PaidByUserId).AsEnumerable().FirstOrDefault(),
                TransactionDate = x.PaymentDate,
                CreatedDate = x.CreatedDate,
                Users = this.orienPYSDbContext.SplitRelations.Where(sr => sr.Slip_Id  == x.Slip_Id).Select(sr => new User()
                {
                    Id = this.orienPYSDbContext.Users.Where(u => u.Id == sr.UserId).Select(u => u.Id).AsEnumerable().FirstOrDefault(),
                    Name = this.orienPYSDbContext.Users.Where(u => u.Id == sr.UserId).Select(u => u.Name).AsEnumerable().FirstOrDefault(),
                    Email = this.orienPYSDbContext.Users.Where(u => u.Id == sr.UserId).Select(u => u.Email).AsEnumerable().FirstOrDefault(),
                }).ToList()
            }).OrderByDescending(x => x.CreatedDate).ToList();

            return sliptransaction;
        }

        [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:Scopes")]
        [Authorize]
        [HttpDelete("{slipid}")]
        public bool DeleteSlipPayment(int slipid)
        {
            return this.slipTransactionService.DeleteSlipTransaction(slipid);
        }
    }
}
