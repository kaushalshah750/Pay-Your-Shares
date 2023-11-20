using Orien.PYS.Business.Models;
using Orien.PYS.Data;
using Orien.PYS.Data.Entity;

namespace Orien.PYS.Business.Service.Implementation
{
    public class CreditCardService : ICreditCardService
    {
        private readonly OrienPYSDbContext orienPYSDbContext;

        public CreditCardService(OrienPYSDbContext orienPYSDbContext)
        {
            this.orienPYSDbContext = orienPYSDbContext;
        }

        public List<Credit_Card> GetCreditCardList()
        {
            var cc = this.orienPYSDbContext.CreditCards.Select(x => new Credit_Card()
            {
                Id = x.Id,
                Card_Name = x.Card_Name,
                Bank_Name = x.Bank_Name,
                Card_Limit = x.Card_Limit,
                Available_Limit = this.orienPYSDbContext.CreditCardSummaries.Where(cc => cc.CreditCardId == x.Id).Select(cc => cc.Available_Limit).AsEnumerable().First(),
                Outstanding_Amount = this.orienPYSDbContext.CreditCardSummaries.Where(cc => cc.CreditCardId == x.Id).Select(cc => cc.Outstanding_Amount).AsEnumerable().First(),
                Unbilled_Amount = this.orienPYSDbContext.CreditCardSummaries.Where(cc => cc.CreditCardId == x.Id).Select(cc => cc.Unbilled_Amount).AsEnumerable().First(),
            }).ToList();
            return cc;
        }

        public List<CreditCardStatementVM> GetCreditCardStatementList()
        {
            var creditcard = this.orienPYSDbContext.CreditCardStatements.Select(x => new CreditCardStatementVM()
            {
                Id = x.Id,
                Amount = x.Amount,
                MinimumAmountDue = x.MinimumAmountDue,
                DueDate = x.DueDate,
                StatementDate = x.StatementDate,
                CreditCard = this.orienPYSDbContext.CreditCards.Where(cc => cc.Id == x.CreditCardId).AsEnumerable().First()
            }).ToList();

            return creditcard;
        }
    }
}
