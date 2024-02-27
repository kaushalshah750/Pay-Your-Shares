using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MimeKit;
using Orien.PYS.Business.Models;
using Orien.PYS.Data;
using Orien.PYS.Data.Entity;
using System.Text.Json;

namespace Orien.PYS.Business.Service.Implementation
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration configuration;
        private readonly OrienPYSDbContext dbContext;
        private readonly ILogger<EmailService> logger;

        public EmailService(
            IConfiguration configuration,
            OrienPYSDbContext dbContext,
            ILogger<EmailService> logger
            )
        {
            this.configuration = configuration;
            this.dbContext = dbContext;
            this.logger = logger;
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

        public async Task<string> SendInviteEmail(InviteEmailBody emailBody)
        {
            try
            {
                this.logger.LogInformation($"Start of Email Body:");
                var emailjson = JsonSerializer.Serialize(emailBody);
                this.logger.LogInformation($"Email Body: {emailjson}");

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
                this.logger.LogInformation("This Email is sent Successfully");
                return "Email Sent";
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                return ex.Message;
            }
        }
    }
}
