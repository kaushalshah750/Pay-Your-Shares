namespace Orien.PYS.Data.Entity
{
    public class CreditCardStatement
    {
        public int Id { get; set; }
        public int CreditCardId { get; set; }
        public CreditCard CreditCard { get; set; }
        public decimal Amount { get; set; }
        public decimal MinimumAmountDue { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime StatementDate { get; set; }
    }
}
