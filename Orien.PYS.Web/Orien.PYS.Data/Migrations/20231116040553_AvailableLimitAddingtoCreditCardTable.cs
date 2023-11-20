using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Orien.PYS.Data.Migrations
{
    /// <inheritdoc />
    public partial class AvailableLimitAddingtoCreditCardTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "Available_Limit",
                table: "CreditCards",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Available_Limit",
                table: "CreditCards");
        }
    }
}
