using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Orien.PYS.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedCreditCardTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Available_Limit",
                table: "CreditCards");

            migrationBuilder.DropColumn(
                name: "Outstanding_Amount",
                table: "CreditCards");

            migrationBuilder.DropColumn(
                name: "Unbilled_Amount",
                table: "CreditCards");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "Available_Limit",
                table: "CreditCards",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "Outstanding_Amount",
                table: "CreditCards",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "Unbilled_Amount",
                table: "CreditCards",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
