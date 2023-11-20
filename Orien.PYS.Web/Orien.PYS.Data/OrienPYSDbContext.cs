using Orien.PYS.Data.Entity;

namespace Orien.PYS.Data
{
    public class OrienPYSDbContext : DbContext
    {
        public OrienPYSDbContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<SlipTransaction> SlipTransactions { get; set; }

        public DbSet<SplitRelation> SplitRelations { get; set; }

        public DbSet<CreditCard> CreditCards { get; set; } 

        public DbSet<CreditCardStatement> CreditCardStatements { get; set; }
        public DbSet<CreditCardSettlement> CreditCardSettlements { get; set; }
        public DbSet<CreditCardSummary> CreditCardSummaries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }


    }
}