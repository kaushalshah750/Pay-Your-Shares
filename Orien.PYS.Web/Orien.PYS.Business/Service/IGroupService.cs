
using Orien.PYS.Business.Models;
using Orien.PYS.Data.Entity;

namespace Orien.PYS.Business.Service
{
    public interface IGroupService
    {
        public Group AddGroup(Group group);
        public bool AddMemberinGroup(AddGroupMember addGroupMember);
    }
}
