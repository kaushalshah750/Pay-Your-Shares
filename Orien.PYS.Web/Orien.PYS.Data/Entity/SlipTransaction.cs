﻿namespace Orien.PYS.Data.Entity
{
    public class SlipTransaction
    {
        public long Id { get; set; }
        public long Slip_Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public int PaidByUserId { get; set; }
        public int AddedBy { get; set; }
        public DateTime PaymentDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
