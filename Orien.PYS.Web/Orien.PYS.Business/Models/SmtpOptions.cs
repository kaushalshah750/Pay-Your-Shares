namespace Orien.PYS.Business.Models
{
    public class SmtpOptions
    {
        public string Server { get; set; }
        public int Port { get; set; }
        public bool UseSsl { get; set; }
        public string SenderName { get; set; }
        public string SenderEmail { get; set; }
    }
}
