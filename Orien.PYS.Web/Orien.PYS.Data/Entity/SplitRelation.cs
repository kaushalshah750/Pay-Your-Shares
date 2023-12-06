namespace Orien.PYS.Data.Entity
{
    public class SplitRelation
    {
        public int Id { get; set; }
        
        public long Slip_Id { get; set; }
        
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
