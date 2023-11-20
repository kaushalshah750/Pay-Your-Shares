using Orien.PYS.Business.Models;
using Orien.PYS.Data.Entity;

namespace Orien.PYS.Business.Service
{
    public interface ICreditCardService
    {
        public List<Credit_Card> GetCreditCardList();
        public List<CreditCardStatementVM> GetCreditCardStatementList();

    }
}
