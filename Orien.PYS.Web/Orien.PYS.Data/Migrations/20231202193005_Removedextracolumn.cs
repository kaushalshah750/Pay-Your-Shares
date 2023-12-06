using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Orien.PYS.Data.Migrations
{
    /// <inheritdoc />
    public partial class Removedextracolumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupMemberRelations_Groups_GroupId",
                table: "GroupMemberRelations");

            migrationBuilder.DropForeignKey(
                name: "FK_GroupMemberRelations_Users_UserId1",
                table: "GroupMemberRelations");

            migrationBuilder.DropIndex(
                name: "IX_GroupMemberRelations_GroupId",
                table: "GroupMemberRelations");

            migrationBuilder.DropIndex(
                name: "IX_GroupMemberRelations_UserId1",
                table: "GroupMemberRelations");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "GroupMemberRelations");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "GroupMemberRelations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_GroupMemberRelations_GroupId",
                table: "GroupMemberRelations",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupMemberRelations_UserId1",
                table: "GroupMemberRelations",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupMemberRelations_Groups_GroupId",
                table: "GroupMemberRelations",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GroupMemberRelations_Users_UserId1",
                table: "GroupMemberRelations",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
