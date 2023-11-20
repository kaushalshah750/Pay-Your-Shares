using Orien.PYS.Data.Entity;

namespace Orien.PYS.Business.Models
{
    public class SlipTransactionVM
    {
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public List<User> Users { get; set; }
    }

    public class UserVM
    {
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
