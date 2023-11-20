using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Orien.PYS.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddedPaidbyusercolumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PaidByUserId",
                table: "SlipTransactions",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaidByUserId",
                table: "SlipTransactions");
        }
    }
}
