using Microsoft.AspNetCore.Mvc;
using Orien.PYS.Business.Models;
using Orien.PYS.Business.Service;
using Orien.PYS.Data.Entity;

namespace Orien.PYS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly IGroupService groupService;

        public GroupsController(
            IGroupService groupService
            )
        {
            this.groupService = groupService;
        }

        [HttpPost("Add")]
        public Group AddGroup(Group group)
        {
            return this.groupService.AddGroup(group);
        }

        [HttpPost("add-member")]
        public bool AddMemberinGroup(AddGroupMember addGroupMember)
        {
            return this.groupService.AddMemberinGroup(addGroupMember);
        }
    }
}
