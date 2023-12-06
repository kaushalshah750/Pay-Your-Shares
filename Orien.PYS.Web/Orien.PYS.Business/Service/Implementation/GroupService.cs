using Orien.PYS.Business.Models;
using Orien.PYS.Data;
using Orien.PYS.Data.Entity;

namespace Orien.PYS.Business.Service.Implementation
{
    public class GroupService : IGroupService
    {
        private readonly OrienPYSDbContext orienPYSDbContext;

        public GroupService(
            OrienPYSDbContext orienPYSDbContext
            )
        {
            this.orienPYSDbContext = orienPYSDbContext;
        }

        public Group AddGroup(Group group)
        {
            try
            {
                this.orienPYSDbContext.Groups.Add(group);
                this.orienPYSDbContext.SaveChanges();
                return group;
            }
            catch
            {
                return null;
            }
        }

        public bool AddMemberinGroup(AddGroupMember addGroupMember)
        {
            try
            {
                foreach(var group in addGroupMember.Users)
                {
                    GroupMemberRelation groupmember = new GroupMemberRelation()
                    {
                        GroupId = addGroupMember.Id,
                        UserId = group
                    };
                    this.orienPYSDbContext.GroupMemberRelations.Add(groupmember);
                    this.orienPYSDbContext.SaveChanges();
                }
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
