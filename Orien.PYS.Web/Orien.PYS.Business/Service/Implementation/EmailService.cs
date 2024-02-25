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

        public async Task<bool> SendInviteEmail(InviteEmailBody emailBody)
        {
            try
            {
                string[] emailParts = emailBody.Email.Split('@');
                string initials = new string(emailParts[0].Where(char.IsLetter).ToArray());
                string toName = char.ToUpper(initials[0]) + initials.Substring(1);

                var smtpOptions = this.configuration.GetSection("SmtpOptions");

                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(smtpOptions.GetSection("SenderName").Value, smtpOptions.GetSection("SenderEmail").Value));
                message.To.Add(new MailboxAddress(toName, emailBody.Email));
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
                }
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
