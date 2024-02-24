﻿namespace Orien.PYS.Data.Entity
{
    public class Group
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
        public string Admin { get; set; }

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
