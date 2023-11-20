namespace Orien.PYS.Business.Models
{
    public class Credit_Card
    {
        public int Id { get; set; }
        public string Bank_Name { get; set; }
        public string Card_Name { get; set; }
        public long Card_Limit { get; set; }
        public long Outstanding_Amount { get; set; }
        public long Unbilled_Amount { get; set; }
        public long Available_Limit { get; set; }
    }
}
