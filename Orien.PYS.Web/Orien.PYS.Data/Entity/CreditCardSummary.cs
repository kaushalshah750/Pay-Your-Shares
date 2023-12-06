namespace Orien.PYS.Data.Entity
{
    public class CreditCardSummary
    {
        public int Id { get; set; }
        public int CreditCardId { get; set; }
        public CreditCard CreditCard { get; set; }
        public long Outstanding_Amount { get; set; }
        public long Unbilled_Amount { get; set; }
        public long Available_Limit { get; set; }
    }
}
