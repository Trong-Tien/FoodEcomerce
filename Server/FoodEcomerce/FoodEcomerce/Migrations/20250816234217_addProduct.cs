using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FoodEcomerce.Migrations
{
    /// <inheritdoc />
    public partial class addProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "IsDelete",
                table: "User",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateAt",
                table: "User",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreateUser",
                table: "User",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteAt",
                table: "User",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdateAt",
                table: "User",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdateUser",
                table: "User",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateAt",
                table: "Role",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreateUser",
                table: "Role",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteAt",
                table: "Role",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDelete",
                table: "Role",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdateAt",
                table: "Role",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdateUser",
                table: "Role",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    CategoryParentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ParentCategory",
                        column: x => x.CategoryParentId,
                        principalTable: "Category",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Menu",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderNumber = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Icon = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    ParentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MenuParentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeleteAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreateUser = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdateUser = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Menu", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Menu_Menu_MenuParentId",
                        column: x => x.MenuParentId,
                        principalTable: "Menu",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Panner",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: true),
                    CreateAt = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateAt = table.Column<DateTime>(type: "datetime", nullable: true),
                    DeleteAt = table.Column<DateTime>(type: "datetime", nullable: true),
                    CreateUser = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UpdateUser = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Panner", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PlaceProduct",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Discription = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreateUser = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlaceProduct", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TradeMark",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    Discription = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    IsDelete = table.Column<bool>(type: "bit", nullable: true),
                    CreateAt = table.Column<DateTime>(type: "datetime", nullable: true),
                    CreateUser = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TradeMark", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UnitCaculate",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Code = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    ConservationRate = table.Column<decimal>(type: "decimal(38,17)", nullable: false),
                    IsBaseUnit = table.Column<bool>(type: "bit", nullable: false),
                    BaseUnitId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UnitCaculate", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ParentUnitCaculate",
                        column: x => x.BaseUnitId,
                        principalTable: "UnitCaculate",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "MenuRole",
                columns: table => new
                {
                    MenuId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RoleId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Add = table.Column<bool>(type: "bit", nullable: true),
                    Watch = table.Column<bool>(type: "bit", nullable: true),
                    Delete = table.Column<bool>(type: "bit", nullable: true),
                    Update = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuRole", x => new { x.RoleId, x.MenuId });
                    table.ForeignKey(
                        name: "FK_MenuRole_Menu",
                        column: x => x.MenuId,
                        principalTable: "Menu",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MenuRole_Role",
                        column: x => x.RoleId,
                        principalTable: "Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    UnitPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    QuantityInStock = table.Column<int>(type: "int", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(38,17)", nullable: false),
                    Inventory = table.Column<int>(type: "int", nullable: false),
                    Discount = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    UnitCaculateId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TradeMarkId = table.Column<int>(type: "int", nullable: false),
                    PlaceProductId = table.Column<int>(type: "int", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateAt = table.Column<DateTime>(type: "datetime", nullable: true),
                    DeleteAt = table.Column<DateTime>(type: "datetime", nullable: true),
                    CreateUser = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    UpdateUser = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlaceProduct_Products",
                        column: x => x.PlaceProductId,
                        principalTable: "PlaceProduct",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TradeMark_Products",
                        column: x => x.PlaceProductId,
                        principalTable: "TradeMark",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UnitCaculate_Products",
                        column: x => x.UnitCaculateId,
                        principalTable: "UnitCaculate",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ImageProduct",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImageProduct", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ImageProduct_Product_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductCategory",
                columns: table => new
                {
                    ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CategoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductCategory", x => new { x.ProductId, x.CategoryId });
                    table.ForeignKey(
                        name: "FK_Category_ProductCategory",
                        column: x => x.CategoryId,
                        principalTable: "Category",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Product_ProductCategory",
                        column: x => x.ProductId,
                        principalTable: "Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Category_CategoryParentId",
                table: "Category",
                column: "CategoryParentId");

            migrationBuilder.CreateIndex(
                name: "IX_ImageProduct_ProductId",
                table: "ImageProduct",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Menu_MenuParentId",
                table: "Menu",
                column: "MenuParentId");

            migrationBuilder.CreateIndex(
                name: "IX_MenuRole_MenuId",
                table: "MenuRole",
                column: "MenuId");

            migrationBuilder.CreateIndex(
                name: "IX_Product_PlaceProductId",
                table: "Product",
                column: "PlaceProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Product_UnitCaculateId",
                table: "Product",
                column: "UnitCaculateId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductCategory_CategoryId",
                table: "ProductCategory",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_UnitCaculate_BaseUnitId",
                table: "UnitCaculate",
                column: "BaseUnitId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ImageProduct");

            migrationBuilder.DropTable(
                name: "MenuRole");

            migrationBuilder.DropTable(
                name: "Panner");

            migrationBuilder.DropTable(
                name: "ProductCategory");

            migrationBuilder.DropTable(
                name: "Menu");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "PlaceProduct");

            migrationBuilder.DropTable(
                name: "TradeMark");

            migrationBuilder.DropTable(
                name: "UnitCaculate");

            migrationBuilder.DropColumn(
                name: "CreateAt",
                table: "User");

            migrationBuilder.DropColumn(
                name: "CreateUser",
                table: "User");

            migrationBuilder.DropColumn(
                name: "DeleteAt",
                table: "User");

            migrationBuilder.DropColumn(
                name: "UpdateAt",
                table: "User");

            migrationBuilder.DropColumn(
                name: "UpdateUser",
                table: "User");

            migrationBuilder.DropColumn(
                name: "CreateAt",
                table: "Role");

            migrationBuilder.DropColumn(
                name: "CreateUser",
                table: "Role");

            migrationBuilder.DropColumn(
                name: "DeleteAt",
                table: "Role");

            migrationBuilder.DropColumn(
                name: "IsDelete",
                table: "Role");

            migrationBuilder.DropColumn(
                name: "UpdateAt",
                table: "Role");

            migrationBuilder.DropColumn(
                name: "UpdateUser",
                table: "Role");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDelete",
                table: "User",
                type: "bit",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");
        }
    }
}
