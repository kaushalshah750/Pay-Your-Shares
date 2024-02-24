using Orien.PYS.Data.Entity;

namespace Orien.PYS.Business.Models
{
    public class SlipTransactionVM
    {
        public long Slip_Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public DateTime TransactionDate { get; set; }
        public User Paid_By { get; set; }
        public List<User> Users { get; set; }
        public DateTime CreatedDate { get; set; }
    }

    public class UserVM
    {
        public string Name { get; set; }
        public string Email { get; set; }
    }

    public class AddSlip
    {
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public string PaidByUser_UId { get; set; }
        public string Group_UId { get; set; }
        public DateTime TransactionDate { get; set; }
        public string[] Users { get; set; }
    }
}
