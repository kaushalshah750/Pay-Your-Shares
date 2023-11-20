namespace Orien.PYS.Data.Entity
{
    public class CreditCardSettlement
    {
        public int Id { get; set; }
        public int CreditCardId { get; set; }
        public CreditCard CreditCard { get; set; }
        public decimal AmountPaid { get; set; }
        public DateTime PaidOn { get; set; }

    }
}
