using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FoodEcomerce.Migrations
{
    /// <inheritdoc />
    public partial class fix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "IsBaseUnit",
                table: "UnitCaculate",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bool");

            migrationBuilder.AlterColumn<decimal>(
                name: "ConservationRate",
                table: "UnitCaculate",
                type: "decimal(38,17)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,0)");

            migrationBuilder.AlterColumn<decimal>(
                name: "TotalPrice",
                table: "Product",
                type: "decimal(38,17)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,0)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "IsBaseUnit",
                table: "UnitCaculate",
                type: "bool",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AlterColumn<decimal>(
                name: "ConservationRate",
                table: "UnitCaculate",
                type: "decimal(18,0)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(38,17)");

            migrationBuilder.AlterColumn<decimal>(
                name: "TotalPrice",
                table: "Product",
                type: "decimal(18,0)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(38,17)");
        }
    }
}
