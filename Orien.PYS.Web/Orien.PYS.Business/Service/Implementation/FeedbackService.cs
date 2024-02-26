using Orien.PYS.Business.Models;
using Orien.PYS.Data;
using Orien.PYS.Data.Entity;

namespace Orien.PYS.Business.Service.Implementation
{
    public class FeedbackService : IFeedbackService
    {
        private readonly OrienPYSDbContext dbContext;

        public FeedbackService(
            OrienPYSDbContext dbContext
            )
        {
            this.dbContext = dbContext;
        }

        public bool CreateFeedback(FeedbackData feedback, string UserId)
        {
            try
            {
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
            catch
            {
                return false;
            }
        }
    }
}
