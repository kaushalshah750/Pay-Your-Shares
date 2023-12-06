using Orien.PYS.Data.Entity;

namespace Orien.PYS.Business.Models
{
    public class CreditCardStatementVM
    {
        public int Id { get; set; }
        public CreditCard CreditCard { get; set; }
        public decimal Amount { get; set; }
        public decimal MinimumAmountDue { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime StatementDate { get; set; }
    }
}
