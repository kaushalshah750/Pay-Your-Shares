using Orien.PYS.Business.Models;
using Orien.PYS.Data;
using Orien.PYS.Data.Entity;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace Orien.PYS.Business.Service.Implementation
{
    public class SMSService : ISMSService
    {
        private readonly OrienPYSDbContext dbContext;

        public SMSService(
            OrienPYSDbContext dbContext
            )
        {
            this.dbContext = dbContext;
        }

        public string SendSMS(SMSBody sMSBody)
        {
            try
            {
                User user = this.dbContext.Users.Where(u => u.UId == sMSBody.ToUId).First();

                var accountSid = "ACaea047a6f165550e3f4aac151864dd3f";
                var authToken = "5ccb35d9bfa6702be70efc4bc0aaea49";
                TwilioClient.Init(accountSid, authToken);

                var messageOptions = new CreateMessageOptions(new PhoneNumber(user.Phone));
                messageOptions.From = new PhoneNumber("+16174010349");
                messageOptions.Body = sMSBody.Body;


                var message = MessageResource.Create(messageOptions);
                return "SMS sent successfully";
            }
            catch (Exception ex)
            {
                return $"Failed to send SMS: {ex.Message}";
            }
        }
    }
}
