using Orien.PYS.Business.Models;

namespace Orien.PYS.Business.Service
{
    public interface ISMSService
    {
        public string SendSMS(SMSBody sMSBody);
    }
}
