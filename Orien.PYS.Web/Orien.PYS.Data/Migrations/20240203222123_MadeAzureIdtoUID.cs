using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Orien.PYS.Data.Migrations
{
    /// <inheritdoc />
    public partial class MadeAzureIdtoUID : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AzureID",
                table: "Users",
                newName: "UId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UId",
                table: "Users",
                newName: "AzureID");
        }
    }
}
