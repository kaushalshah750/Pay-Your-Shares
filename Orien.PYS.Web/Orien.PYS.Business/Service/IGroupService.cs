
using Orien.PYS.Business.Models;
using Orien.PYS.Data.Entity;

namespace Orien.PYS.Business.Service
{
    public interface IGroupService
    {
        public GroupDetail GetGroupInfo(string groupId);
        public List<GroupDetail> GetGroup();
        public bool AddGroup(CreateGroup group, string userid);
        public bool AddMemberinGroup(AddGroupMember addGroupMember);
    }
}
