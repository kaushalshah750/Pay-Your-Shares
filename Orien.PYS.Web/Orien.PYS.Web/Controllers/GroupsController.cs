using Microsoft.AspNetCore.Mvc;
using Orien.PYS.Business.Models;
using Orien.PYS.Business.Service;
using Orien.PYS.Data.Entity;
using System.IdentityModel.Tokens.Jwt;

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

        [HttpGet]
        public List<GroupDetail> GetGroup()
        {
            return this.groupService.GetGroup();
        }

        [HttpGet("{groupId}")]
        public GroupDetail GetGroupInfo(string groupId)
        {
            return this.groupService.GetGroupInfo(groupId);
        }

        [HttpPost("Create")]
        public bool CreateGroup(CreateGroup group)
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler().ReadJwtToken(token);
            var userid = handler.Claims.First(x => x.Type == "sub").Value;

            return this.groupService.AddGroup(group, userid);
        }

        [HttpPost("add-member")]
        public bool AddMemberinGroup(AddGroupMember addGroupMember)
        {
            return this.groupService.AddMemberinGroup(addGroupMember);
        }
    }
}
