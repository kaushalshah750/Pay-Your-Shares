namespace Orien.PYS.Data.Entity
{
    public class SlipTransaction
    {
        public long Id { get; set; }
        public long Slip_Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
    }
}
