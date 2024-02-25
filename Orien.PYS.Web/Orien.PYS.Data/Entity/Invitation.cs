namespace Orien.PYS.Data.Entity
{
    public class GroupInvitation
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Invite_UId { get; set; }
        public string Group_UId { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public bool IsHTML { get; set; }
    }
}
