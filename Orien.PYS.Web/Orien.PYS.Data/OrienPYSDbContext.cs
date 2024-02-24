using Orien.PYS.Data.Entity;

namespace Orien.PYS.Data
{
    public class OrienPYSDbContext : DbContext
    {
        public OrienPYSDbContext(DbContextOptions options)
            : base(options)
        {
        }

        /// <summary>
        /// Gets or Sets Users.
        /// </summary>
        public DbSet<User> Users { get; set; }

        /// <summary>
        /// Gets or Sets Users.
        /// </summary>
        public DbSet<SlipTransaction> SlipTransactions { get; set; }

        /// <summary>
        /// Gets or Sets Users.
        /// </summary>
        public DbSet<SplitRelation> SplitRelations { get; set; }

        /// <summary>
        /// Gets or Sets Users.
        /// </summary>
        public DbSet<CreditCard> CreditCards { get; set; }

        /// <summary>
        /// Gets or Sets Users.
        /// </summary>
        public DbSet<CreditCardStatement> CreditCardStatements { get; set; }

        /// <summary>
        /// Gets or Sets Users.
        /// </summary>
        public DbSet<CreditCardSettlement> CreditCardSettlements { get; set; }

        /// <summary>
        /// Gets or Sets Users.
        /// </summary>
        public DbSet<CreditCardSummary> CreditCardSummaries { get; set; }

        /// <summary>
        /// Gets or Sets Groups.
        /// </summary>
        public DbSet<Group> Groups { get; set; }

        /// <summary>
        /// Gets or Sets Email Sent.
        /// </summary>
        public DbSet<EmailSent> EmailSent { get; set; }

        /// <summary>
        /// Gets or Sets Users.
        /// </summary>
        public DbSet<GroupMemberRelation> Group_User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }


    }
}