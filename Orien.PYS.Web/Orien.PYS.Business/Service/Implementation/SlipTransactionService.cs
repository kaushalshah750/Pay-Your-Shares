using Orien.PYS.Business.Models;
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

        public List<SlipTransactionVM> GetallSlipTransaction(string userid, string groupId)
        {

            List<SlipTransactionVM> sliptransaction = this.orienPYSDbContext.SlipTransactions
                .Where(st => (st.PaidUser_UId == userid || st.AddedBy_UId == userid ||
                    this.orienPYSDbContext.SplitRelations
                        .Where(sr => sr.Slip_Id == st.Slip_Id)
                        .Select(sr => sr.User_UId).ToList().Contains(userid)) && 
                        (this.orienPYSDbContext.SplitRelations
                        .Where(sr => sr.Group_UId == groupId)
                        .Select(sr => sr.User_UId).ToList().Contains(userid)))
                .Select(x => new SlipTransactionVM()
                {
                    Slip_Id = x.Slip_Id,
                    Name = x.Name,
                    Amount = x.Amount,
                    Paid_By = this.orienPYSDbContext.Users.Where(u => u.UId == x.PaidUser_UId).AsEnumerable().FirstOrDefault()!,
                    TransactionDate = x.PaymentDate,
                    CreatedDate = x.CreatedDate,
                    Users = this.orienPYSDbContext.SplitRelations.Where(sr => sr.Slip_Id == x.Slip_Id).Select(sr => new User()
                    {
                        Id = this.orienPYSDbContext.Users.Where(u => u.UId == sr.User_UId).Select(u => u.Id).AsEnumerable().FirstOrDefault(),
                        Name = this.orienPYSDbContext.Users.Where(u => u.UId == sr.User_UId).Select(u => u.Name).AsEnumerable().FirstOrDefault()!,
                        Email = this.orienPYSDbContext.Users.Where(u => u.UId == sr.User_UId).Select(u => u.Email).AsEnumerable().FirstOrDefault()!,
                        Picture = this.orienPYSDbContext.Users.Where(u => u.UId == sr.User_UId).Select(u => u.Picture).AsEnumerable().FirstOrDefault()!,
                        UId = this.orienPYSDbContext.Users.Where(u => u.UId == sr.User_UId).Select(u => u.UId).AsEnumerable().FirstOrDefault()!,
                    }).ToList()
                }).OrderByDescending(x => x.CreatedDate).ToList();

            return sliptransaction;
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

        public bool AddSlip(AddSlip addSlip, string userid)
        {
            try
            {
                SlipTransaction SlipTransaction = new SlipTransaction()
                {
                    Slip_Id = 0,
                    Name = addSlip.Name,
                    Amount = addSlip.Amount,
                    PaidUser_UId = addSlip.PaidByUser_UId,
                    AddedBy_UId = userid,
                    PaymentDate = addSlip.TransactionDate,
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now
                };

                this.orienPYSDbContext.SlipTransactions.Add(SlipTransaction);
                this.orienPYSDbContext.SaveChanges();

                SlipTransaction.Slip_Id = SlipTransaction.Id;
                this.orienPYSDbContext.SaveChanges();

                for (var i = 0; i < addSlip.Users.Length; i++)
                {
                    SplitRelation splitRelation = new SplitRelation()
                    {
                        Slip_Id = SlipTransaction.Slip_Id,
                        User_UId = addSlip.Users[i],
                        Group_UId = addSlip.Group_UId
                    };
                    this.orienPYSDbContext.SplitRelations.Add(splitRelation);
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
