using Microsoft.Extensions.Logging;
using Orien.PYS.Business.Models;
using Orien.PYS.Data;
using Orien.PYS.Data.Entity;
using System.Text.Json;

namespace Orien.PYS.Business.Service.Implementation
{
    public class FeedbackService : IFeedbackService
    {
        private readonly OrienPYSDbContext dbContext;
        private readonly ILogger<FeedbackService> logger;

        public FeedbackService(
            OrienPYSDbContext dbContext,
            ILogger<FeedbackService> logger
            )
        {
            this.dbContext = dbContext;
            this.logger = logger;
        }

        public bool CreateFeedback(FeedbackData feedback, string UserId)
        {
            try
            {
                this.logger.LogInformation("Start of CreateFeedback");
                this.logger.LogInformation($"CreateFeedback - UserId - {UserId}");
                var feedbackjson = JsonSerializer.Serialize(feedback);
                this.logger.LogInformation($"CreateFeedback - feedback - {feedbackjson}");

                Feedback NewFeedback = new Feedback()
                {
                    Id = 0,
                    User_UId = UserId,
                    Feedback_Info = feedback.Feedback,
                    Created_On = DateTime.Now
                };

                this.dbContext.Feedbacks.Add(NewFeedback);
                this.dbContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                return false;
            }
        }
    }
}
