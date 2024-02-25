
using Orien.PYS.Business.Models;
using Orien.PYS.Data.Entity;

namespace Orien.PYS.Business.Service
{
    public interface IGroupService
    {
        public GroupDetail GetGroupInfo(string groupId);
        public List<User> GetAllUserInfoByGroup(string groupId);
        public List<User> GetUserInfoByGroup(string groupId, string userId);
        public List<GroupDetail> GetGroup(string userId);
        public bool AddGroup(CreateGroup group, string userid);
        public bool AddMemberinGroup(AddGroupMember addGroupMember);
        public bool RemoveMemberinGroup(RemoveGroupMember groupMember);
        public Task<ResponseData> SendInvitationOfGroup(SendGroupInvite sendGroupInvite);
    }
}
