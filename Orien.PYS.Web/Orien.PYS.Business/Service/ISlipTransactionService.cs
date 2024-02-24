using Orien.PYS.Business.Models;

namespace Orien.PYS.Business.Service
{
    public interface ISlipTransactionService
    {
        public List<SlipTransactionVM> GetallSlipTransaction(string userid, string groupId);
        public bool DeleteSlipTransaction(int slipid);
        public bool AddSlip(AddSlip addSlip, string userid);
    }
}
