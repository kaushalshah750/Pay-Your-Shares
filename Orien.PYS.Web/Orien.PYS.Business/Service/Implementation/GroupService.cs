using Orien.PYS.Business.Models;
using Orien.PYS.Data;
using Orien.PYS.Data.Entity;
using System;
using System.Linq;
using System.Security.Cryptography;

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

        public GroupDetail GetGroupInfo(string groupId)
        {
            GroupDetail group = this.orienPYSDbContext.Groups.Where(g => g.UId == groupId).Select(x => new GroupDetail()
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                UId = x.UId,
                Admin = this.orienPYSDbContext.Users.Where(u => u.UId == x.Admin).First(),
                Members = this.orienPYSDbContext.Users.Where(u => this.orienPYSDbContext.Group_User
                .Where(g => g.Group_UId == x.UId)
                .Select(g => g.User_UId)
                .ToList()
                .Contains(u.UId)).ToList(),
                Created_on = x.Created_on,
                Updated_on = x.Updated_on
            }).First();

            return group;
        }

        public List<GroupDetail> GetGroup()
        {
            try
            {
                List<GroupDetail> groups = this.orienPYSDbContext.Groups.Select(x => new GroupDetail()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    UId = x.UId,
                    Admin = this.orienPYSDbContext.Users.Where(u => u.UId == x.Admin).First(),
                    Members = this.orienPYSDbContext.Users.Where(u => this.orienPYSDbContext.Group_User
                    .Where(g => g.Group_UId == x.UId)
                    .Select(g => g.User_UId)
                    .ToList()
                    .Contains(u.UId)).ToList(),
                    Created_on = x.Created_on,
                    Updated_on = x.Updated_on
                }).ToList();

                return groups;
            }
            catch
            {
                return null;
            }
        }

        public string GenerateUniqueRandomNumber()
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[25];
            var random = new Random();

            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }

            var finalString = new String(stringChars);
            var groupExists = this.orienPYSDbContext.Groups.Where(g => g.UId == finalString).FirstOrDefault();

            return finalString;
        }

        public bool AddGroup(CreateGroup group, string userid)
        {
            try
            {
                var uid = GenerateUniqueRandomNumber();

                Group newGroup = new Group()
                {
                    Name = group.Name,
                    Description = group.Description,
                    UId = uid,
                    Admin = userid,
                    Created_on = DateTime.Now,
                    Updated_on = DateTime.Now
                };

                this.orienPYSDbContext.Groups.Add(newGroup);
                this.orienPYSDbContext.SaveChanges();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool AddMemberinGroup(AddGroupMember addGroupMember)
        {
            try
            {
                var user = this.orienPYSDbContext.Users.First(x => x.Email == addGroupMember.Email);
                GroupMemberRelation groupmember = new GroupMemberRelation()
                {
                    Group_UId = addGroupMember.Group_Uid,
                    User_UId = user.UId
                };
                this.orienPYSDbContext.Group_User.Add(groupmember);
                this.orienPYSDbContext.SaveChanges();

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
