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
        public string Group_UId { get; set; }

        /// <summary>
        /// Gets or Sets UserId.
        /// </summary>
        public string User_UId { get; set; }

        /// <summary>
        /// Gets or Sets User Added.
        /// </summary>
        public DateTime Added_on { get; set; }
    }
}
