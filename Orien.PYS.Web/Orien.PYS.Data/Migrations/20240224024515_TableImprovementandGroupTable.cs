using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Orien.PYS.Data.Migrations
{
    /// <inheritdoc />
    public partial class TableImprovementandGroupTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SplitRelations_Users_UserId",
                table: "SplitRelations");

            migrationBuilder.DropIndex(
                name: "IX_SplitRelations_UserId",
                table: "SplitRelations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GroupMemberRelations",
                table: "GroupMemberRelations");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "SplitRelations");

            migrationBuilder.DropColumn(
                name: "AddedBy",
                table: "SlipTransactions");

            migrationBuilder.DropColumn(
                name: "PaidByUserId",
                table: "SlipTransactions");

            migrationBuilder.DropColumn(
                name: "GroupId",
                table: "GroupMemberRelations");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "GroupMemberRelations");

            migrationBuilder.RenameTable(
                name: "GroupMemberRelations",
                newName: "Group_User");

            migrationBuilder.AddColumn<string>(
                name: "Picture",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Group_UId",
                table: "SplitRelations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "User_UId",
                table: "SplitRelations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AddedBy_UId",
                table: "SlipTransactions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PaidUser_UId",
                table: "SlipTransactions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Admin",
                table: "Groups",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "Created_on",
                table: "Groups",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "UId",
                table: "Groups",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "Updated_on",
                table: "Groups",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Added_on",
                table: "Group_User",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Group_UId",
                table: "Group_User",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "User_UId",
                table: "Group_User",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Group_User",
                table: "Group_User",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Group_User",
                table: "Group_User");

            migrationBuilder.DropColumn(
                name: "Picture",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Group_UId",
                table: "SplitRelations");

            migrationBuilder.DropColumn(
                name: "User_UId",
                table: "SplitRelations");

            migrationBuilder.DropColumn(
                name: "AddedBy_UId",
                table: "SlipTransactions");

            migrationBuilder.DropColumn(
                name: "PaidUser_UId",
                table: "SlipTransactions");

            migrationBuilder.DropColumn(
                name: "Admin",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "Created_on",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "UId",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "Updated_on",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "Added_on",
                table: "Group_User");

            migrationBuilder.DropColumn(
                name: "Group_UId",
                table: "Group_User");

            migrationBuilder.DropColumn(
                name: "User_UId",
                table: "Group_User");

            migrationBuilder.RenameTable(
                name: "Group_User",
                newName: "GroupMemberRelations");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "SplitRelations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "AddedBy",
                table: "SlipTransactions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PaidByUserId",
                table: "SlipTransactions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<long>(
                name: "GroupId",
                table: "GroupMemberRelations",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "GroupMemberRelations",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddPrimaryKey(
                name: "PK_GroupMemberRelations",
                table: "GroupMemberRelations",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_SplitRelations_UserId",
                table: "SplitRelations",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_SplitRelations_Users_UserId",
                table: "SplitRelations",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
