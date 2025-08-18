using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FoodEcomerce.Migrations
{
    /// <inheritdoc />
    public partial class AddCart : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ImageProduct_Product_ProductId",
                table: "ImageProduct");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductCategory",
                table: "ProductCategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MenuRole",
                table: "MenuRole");

            migrationBuilder.RenameTable(
                name: "ProductCategory",
                newName: "ProductCategorys");

            migrationBuilder.RenameTable(
                name: "MenuRole",
                newName: "MenuRoles");

            migrationBuilder.RenameIndex(
                name: "IX_ProductCategory_CategoryId",
                table: "ProductCategorys",
                newName: "IX_ProductCategorys_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_MenuRole_MenuId",
                table: "MenuRoles",
                newName: "IX_MenuRoles_MenuId");

            migrationBuilder.AlterColumn<decimal>(
                name: "ConservationRate",
                table: "UnitCaculate",
                type: "decimal(38,17)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,0)");

            migrationBuilder.AlterColumn<string>(
                name: "ImageUrl",
                table: "ImageProduct",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductCategorys",
                table: "ProductCategorys",
                columns: new[] { "ProductId", "CategoryId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_MenuRoles",
                table: "MenuRoles",
                columns: new[] { "RoleId", "MenuId" });

            migrationBuilder.CreateTable(
                name: "Cart",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "datetime", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cart", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cart_user",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PaymentMenthod",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PayMentMethod", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StatusOrders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StatusOrders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CartItem",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CartId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UnitCaculateId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "decimal"),
                    TotalPrice = table.Column<decimal>(type: "decimal")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CartItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cart_CartItem",
                        column: x => x.CartId,
                        principalTable: "Cart",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Product_CartItem",
                        column: x => x.ProductId,
                        principalTable: "Product",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UnitCaculate_CartItem",
                        column: x => x.UnitCaculateId,
                        principalTable: "UnitCaculate",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ShippingAddress = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    TotalPrice = table.Column<decimal>(type: "decimal", nullable: false),
                    ShippingFee = table.Column<decimal>(type: "decimal", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PaymentMenthodId = table.Column<int>(type: "int", nullable: false),
                    StatusOrdersId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_PaymentMethod",
                        column: x => x.PaymentMenthodId,
                        principalTable: "PaymentMenthod",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Orders_StatusOrders",
                        column: x => x.StatusOrdersId,
                        principalTable: "StatusOrders",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Orders_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "OrderDetail",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "decimal", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal", nullable: false),
                    OrderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UnitCaculateId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderDetail_Order",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_OrderDetail_Product",
                        column: x => x.ProductId,
                        principalTable: "Product",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_OrderDetail_UnitCaculate",
                        column: x => x.UnitCaculateId,
                        principalTable: "UnitCaculate",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cart_UserId",
                table: "Cart",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CartItem_CartId",
                table: "CartItem",
                column: "CartId");

            migrationBuilder.CreateIndex(
                name: "IX_CartItem_ProductId",
                table: "CartItem",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_CartItem_UnitCaculateId",
                table: "CartItem",
                column: "UnitCaculateId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetail_OrderId",
                table: "OrderDetail",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetail_ProductId",
                table: "OrderDetail",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetail_UnitCaculateId",
                table: "OrderDetail",
                column: "UnitCaculateId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_PaymentMenthodId",
                table: "Orders",
                column: "PaymentMenthodId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_StatusOrdersId",
                table: "Orders",
                column: "StatusOrdersId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemProduct_Products",
                table: "ImageProduct",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemProduct_Products",
                table: "ImageProduct");

            migrationBuilder.DropTable(
                name: "CartItem");

            migrationBuilder.DropTable(
                name: "OrderDetail");

            migrationBuilder.DropTable(
                name: "Cart");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "PaymentMenthod");

            migrationBuilder.DropTable(
                name: "StatusOrders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductCategorys",
                table: "ProductCategorys");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MenuRoles",
                table: "MenuRoles");

            migrationBuilder.RenameTable(
                name: "ProductCategorys",
                newName: "ProductCategory");

            migrationBuilder.RenameTable(
                name: "MenuRoles",
                newName: "MenuRole");

            migrationBuilder.RenameIndex(
                name: "IX_ProductCategorys_CategoryId",
                table: "ProductCategory",
                newName: "IX_ProductCategory_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_MenuRoles_MenuId",
                table: "MenuRole",
                newName: "IX_MenuRole_MenuId");

            migrationBuilder.AlterColumn<decimal>(
                name: "ConservationRate",
                table: "UnitCaculate",
                type: "decimal(18,0)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(38,17)");

            migrationBuilder.AlterColumn<string>(
                name: "ImageUrl",
                table: "ImageProduct",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(300)",
                oldMaxLength: 300,
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductCategory",
                table: "ProductCategory",
                columns: new[] { "ProductId", "CategoryId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_MenuRole",
                table: "MenuRole",
                columns: new[] { "RoleId", "MenuId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ImageProduct_Product_ProductId",
                table: "ImageProduct",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
