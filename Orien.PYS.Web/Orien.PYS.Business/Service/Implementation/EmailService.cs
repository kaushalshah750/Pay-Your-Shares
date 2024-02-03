using Microsoft.Extensions.Configuration;
using MimeKit;
using Orien.PYS.Business.Models;
using Orien.PYS.Data;
using Orien.PYS.Data.Entity;

namespace Orien.PYS.Business.Service.Implementation
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration configuration;
        private readonly OrienPYSDbContext dbContext;

        public EmailService(
            IConfiguration configuration,
            OrienPYSDbContext dbContext
            )
        {
            this.configuration = configuration;
            this.dbContext = dbContext;
        }

        public async Task<bool> SendEmail(EmailBody emailBody)
        {
            try
            {
                //string[] emailParts = email.Split('@');
                //string initials = new string(emailParts[0].Where(char.IsLetter).ToArray());
                //string toName = char.ToUpper(initials[0]) + initials.Substring(1);
                // Your email content
                //var emailSubject = "SMMA Services - YouTube Subscribers, Views, Likes, Instagram Followers, Likes, and Comments";
                //var emailBody = $"Hi {toName} 🙋‍♀️,\n\nI'm Kaushal Shah and I offer SMMA services that can help grow your online presence on YouTube and Instagram. Specifically, I can provide services such as subscribers, views, likes, followers, and comments. 🚀\n\nI'm writing to find out what your goals are for your YouTube channel. Let me know the target number of subscribers or views you're aiming to achieve. If your channel isn't monetized yet, I could also provide assistance on that end. 💰\n\nIf you're interested, let's proceed with pricing and packages tailored to your specific needs and goals. My services can significantly enhance your online presence and help you better reach your target audience.\n\nPlease feel free to let me know your preferences, specific requirements, or ask any questions or share any concerns you have. I'm more than happy to help you achieve your goals. 🔍\n\nThank you for your time, and I look forward to hearing from you soon! 😊\n\nBest regards,\nKaushal Shah";

                var user = this.dbContext.Users.Where(u => u.UId == emailBody.UId).FirstOrDefault();

                if (user != null)
                {
                    var smtpOptions = this.configuration.GetSection("SmtpOptions");

                    var message = new MimeMessage();
                    message.From.Add(new MailboxAddress(smtpOptions.GetSection("SenderName").Value, smtpOptions.GetSection("SenderEmail").Value));
                    message.To.Add(new MailboxAddress(user.Name, user.Email));
                    message.Subject = emailBody.Subject;

                    var textPart = new TextPart(emailBody.isHtml ? "html" : "plain")
                    {
                        Text = emailBody.Body
                    };

                    var multipart = new Multipart("mixed");
                    multipart.Add(textPart);

                    message.Body = multipart;

                    using (var client = new MailKit.Net.Smtp.SmtpClient())
                    {
                        await client.ConnectAsync(smtpOptions.GetSection("Server").Value, int.Parse(smtpOptions.GetSection("Port").Value!), bool.Parse(smtpOptions.GetSection("UseSsl").Value!));

                        // Note: If your SMTP server requires authentication, you need to set it up here.
                        await client.AuthenticateAsync(smtpOptions.GetSection("Username").Value, smtpOptions.GetSection("Password").Value);

                        await client.SendAsync(message);
                        await client.DisconnectAsync(true);

                        EmailSent email = new EmailSent()
                        {
                            Id = 0,
                            Name = user.Name,
                            Email = user.Email,
                            Subject = emailBody.Subject,
                            Body = emailBody.Body,
                            IsHTML = emailBody.isHtml
                        };

                        this.dbContext.EmailSent.Add(email);
                        this.dbContext.SaveChanges();

                    }
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }
    }
}
