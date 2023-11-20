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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }


    }
}