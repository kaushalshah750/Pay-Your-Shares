using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Orien.PYS.Data.Migrations
{
    /// <inheritdoc />
    public partial class AmountAddingtoCreditCardTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "Card_Limit",
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Card_Limit",
                table: "CreditCards");

            migrationBuilder.DropColumn(
                name: "Outstanding_Amount",
                table: "CreditCards");

            migrationBuilder.DropColumn(
                name: "Unbilled_Amount",
                table: "CreditCards");
        }
    }
}
