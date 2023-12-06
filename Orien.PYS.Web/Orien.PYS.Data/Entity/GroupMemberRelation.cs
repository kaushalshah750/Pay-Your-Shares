namespace Orien.PYS.Data.Entity
{
    public class GroupMemberRelation
    {
        /// <summary>
        /// Gets or Sets Id.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or Sets GroupId.
        /// </summary>
        public long GroupId { get; set; }

        /// <summary>
        /// Gets or Sets UserId.
        /// </summary>
        public long UserId { get; set; }
    }
}
