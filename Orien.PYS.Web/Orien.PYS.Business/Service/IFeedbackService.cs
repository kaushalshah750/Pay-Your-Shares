using Orien.PYS.Business.Models;

namespace Orien.PYS.Business.Service
{
    public interface IFeedbackService
    {
        public bool CreateFeedback(FeedbackData feedback, string UserId);
    }
}
