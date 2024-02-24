using Orien.PYS.Data.Entity;

namespace Orien.PYS.Business.Models
{
    public class GroupDetail
    {
        /// <summary>
        /// Gets or Sets Id.
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// Gets or Sets Name.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Gets or Sets Unique Identity.
        /// </summary>
        public string UId { get; set; }

        /// <summary>
        /// Gets or Sets Description.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Gets or Sets Admin.
        /// </summary>
        public User Admin { get; set; }

        /// <summary>
        /// Gets or Sets Admin.
        /// </summary>
        public List<User> Members { get; set; }

        /// <summary>
        /// Gets or Sets Created On.
        /// </summary>
        public DateTime Created_on { get; set; }

        /// <summary>
        /// Gets or Sets Updated on.
        /// </summary>
        public DateTime Updated_on { get; set; }
    }
}
