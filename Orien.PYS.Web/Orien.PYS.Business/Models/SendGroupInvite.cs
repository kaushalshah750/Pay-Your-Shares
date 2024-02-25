namespace Orien.PYS.Business.Models
{
    public class SendGroupInvite
    {
        public string Email { get; set; }
        public string Invite_UId { get; set; }
        public string Group_UId { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public bool IsHTML { get; set; }
    }
}
