namespace Orien.PYS.Business.Models
{
    public class InviteEmailBody
    {
        public string Email { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public bool isHtml { get; set; }
    }
}
