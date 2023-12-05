using Orien.PYS.Data;
using Orien.PYS.Data.Entity;

namespace Orien.PYS.Business.Service.Implementation
{
    public class SlipTransactionService : ISlipTransactionService
    {
        private readonly OrienPYSDbContext orienPYSDbContext;

        public SlipTransactionService(OrienPYSDbContext orienPYSDbContext)
        {
            this.orienPYSDbContext = orienPYSDbContext;
        }

        public bool DeleteSlipTransaction(int slipid)
        {
            try
            {
                var sliptransaction = this.orienPYSDbContext.SlipTransactions.Where(st => st.Slip_Id == slipid).First();

                this.orienPYSDbContext.SlipTransactions.Remove(sliptransaction);

                List<SplitRelation> splitRelations = this.orienPYSDbContext.SplitRelations.Where(sr => sr.Slip_Id == slipid).ToList();

                foreach(var slip in splitRelations)
                {
                    this.orienPYSDbContext.SplitRelations.Remove(slip);
                }

                this.orienPYSDbContext.SaveChanges();

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
