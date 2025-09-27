using Microsoft.EntityFrameworkCore;


namespace FoodEcomerce.Entity
{
    public class FoodDbContex : DbContext
    {
        public FoodDbContex(DbContextOptions<FoodDbContex> options) : base(options)
        {

        }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<MenuRole> MenuRoles { get; set; }
        public virtual DbSet<Status> Status { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductCategory> ProductCategorys { get; set; }
        public virtual DbSet<OTP> OTPs { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<UnitCaculate> UnitCaculates { get; set; }

        public virtual DbSet<ImageProduct> ImageProducts { get; set; }  
        public virtual DbSet<Cart> Carts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Status>(entity =>
            {
                entity.HasKey(x => x.Id).HasName("PK_Status");
                entity.ToTable("Status");

                entity.Property(x => x.Id).ValueGeneratedOnAdd();
                entity.Property(x => x.Name).HasMaxLength(50);
            });
            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(x => x.Id).HasName("PK_Role");
                entity.ToTable("Role");
                entity.Property(x => x.Id).ValueGeneratedNever();
                entity.Property(x => x.Name).HasMaxLength(50);
                entity.Property(x => x.OrderNumber).HasColumnType("int");
                entity.Property(x => x.Discription).HasMaxLength(300);
            });
            // many - to - many
            modelBuilder.Entity<MenuRole>().HasKey(e => new { e.RoleId, e.MenuId });
            modelBuilder.Entity<MenuRole>().HasOne(e => e.Role).WithMany(s => s.MenuRoles).HasForeignKey(d => d.RoleId).HasConstraintName("FK_MenuRole_Role");
            modelBuilder.Entity<MenuRole>().HasOne(e => e.Menu).WithMany(s => s.MenuRoles).HasForeignKey(d => d.MenuId).HasConstraintName("FK_MenuRole_Menu");

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(x => x.Id).HasName("PK_User");
                entity.ToTable("User");
                entity.Property(x => x.Id).ValueGeneratedNever();
                entity.Property(x => x.UserName).HasMaxLength(50);
                entity.Property(x => x.Password).HasColumnType("nvarchar(max)");
                entity.Property(x => x.Email).HasMaxLength(50);
                entity.Property(x => x.PhoneNumber).HasMaxLength(11);
                entity.Property(x => x.Address).HasMaxLength(300);
                entity.Property(x => x.IsDelete).HasColumnType("bit");
                entity.Property(x => x.Acvite).HasColumnType("bit");
                entity.Property(x => x.IsAdmin).HasColumnType("bit");
                entity.HasOne(d => d.Status)
                      .WithMany(d => d.Users)
                      .HasForeignKey(x => x.StatusId)
                      .OnDelete(DeleteBehavior.ClientSetNull)
                      .HasConstraintName("FK_Status_User");
                entity.HasOne(d => d.Role)
                     .WithMany(d => d.Users)
                     .HasForeignKey(x => x.RoleId)
                     .OnDelete(DeleteBehavior.ClientSetNull)
                     .HasConstraintName("FK_Role_User");
            });


            modelBuilder.Entity<TradeMark>(entity =>
            {
                entity.HasKey(x => x.Id).HasName("PK_TradeMark");
                entity.ToTable("TradeMark");
                entity.Property(x => x.Id).ValueGeneratedNever();
                entity.Property(x => x.Name).HasMaxLength(50);
                entity.Property(x => x.ImageUrl).HasMaxLength(300);
                entity.Property(x => x.Discription).HasMaxLength(300);
                entity.Property(x => x.IsDelete).HasColumnType("bit");
                entity.Property(x => x.CreateAt).HasColumnType("datetime");
                entity.Property(x => x.CreateUser).HasMaxLength(100);
            });
            modelBuilder.Entity<PlaceProduct>(entity =>
            {
                entity.HasKey(x => x.Id).HasName("PK_PlaceProduct");
                entity.ToTable("PlaceProduct");
                entity.Property(x => x.Id).ValueGeneratedNever();
                entity.Property(x => x.Name).HasMaxLength(50);
                entity.Property(x => x.Discription).HasMaxLength(300);
            });
            modelBuilder.Entity<Panner>(entity =>
            {
                entity.HasKey(x => x.Id).HasName("PK_Panner");
                entity.ToTable("Panner");
                entity.Property(x => x.Id).ValueGeneratedNever();
                entity.Property(x => x.Name).HasMaxLength(50);
                entity.Property(x => x.ImageUrl).HasMaxLength(300);
                entity.Property(x => x.Active).HasColumnType("bit");
                entity.Property(x => x.IsDelete).HasColumnType("bit");
                entity.Property(x => x.CreateUser).HasMaxLength(50);
                entity.Property(x => x.UpdateUser).HasMaxLength(50);
                entity.Property(x => x.CreateAt).HasColumnType("datetime");
                entity.Property(x => x.UpdateAt).HasColumnType("datetime");
                entity.Property(x => x.DeleteAt).HasColumnType("datetime");
            });
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(x => x.Id).HasName("PK_Category");
                entity.ToTable("Category");
                entity.Property(x => x.Id).ValueGeneratedNever();
                entity.Property(x => x.Name).HasMaxLength(50);
                entity.Property(x => x.Description).HasMaxLength(300);
                entity.Property(x => x.ImageUrl).HasMaxLength(300);
                entity.HasOne(e => e.ParentCategory)
                                    .WithMany(e => e.ChildCategories)
                                    .HasForeignKey(e => e.CategoryParentId)
                                    .HasConstraintName("FK_ParentCategory")
                                    .OnDelete(DeleteBehavior.ClientSetNull);

            });
            // many - to - many
            modelBuilder.Entity<ProductCategory>().HasKey(r => new { r.ProductId, r.CategoryId });
            modelBuilder.Entity<ProductCategory>().HasOne(e => e.Products).WithMany(r => r.ProductCategories).HasForeignKey(r => r.ProductId).HasConstraintName("FK_Product_ProductCategory");
            modelBuilder.Entity<ProductCategory>().HasOne(e => e.Categories).WithMany(r => r.ProductCategories).HasForeignKey(r => r.CategoryId).HasConstraintName("FK_Category_ProductCategory");

            modelBuilder.Entity<UnitCaculate>(entity =>
            {
                entity.HasKey(x => x.Id).HasName("PK_UnitCaculate");
                entity.ToTable("UnitCaculate");
                entity.Property(x => x.Id).ValueGeneratedNever();
                entity.Property(x => x.Name).HasMaxLength(50);
                entity.Property(x => x.Code).HasMaxLength(300);
                entity.Property(x => x.Description).HasMaxLength(300);
                entity.Property(x => x.ConservationRate).HasColumnType("decimal");
                entity.Property(x => x.IsBaseUnit).HasColumnType("bit");
                entity.HasOne(x => x.ParentUnitCaculate)
                        .WithMany(x => x.SubUnitCaculates)
                        .HasForeignKey(e => e.BaseUnitId)
                        .HasConstraintName("FK_ParentUnitCaculate")
                        .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(x => x.Id).HasName("PK_Product");
                entity.ToTable("Product");
                entity.Property(x => x.Id).ValueGeneratedNever();
                entity.Property(x => x.Name).HasMaxLength(50);
                entity.Property(x => x.Description).HasMaxLength(300);
                entity.Property(x => x.UnitPrice).HasColumnType("decimal");
                entity.Property(x => x.QuantityInStock).HasColumnType("int");
                entity.Property(x => x.TotalPrice).HasColumnType("decimal");
                entity.Property(x => x.Inventory).HasColumnType("int");
                entity.Property(x => x.Discount).HasColumnType("int");
                entity.Property(x => x.IsActive).HasColumnType("bit");
                entity.Property(x => x.IsDelete).HasColumnType("bit");
                entity.Property(x => x.CreateAt).HasColumnType("datetime");
                entity.Property(x => x.UpdateAt).HasColumnType("datetime");
                entity.Property(x => x.DeleteAt).HasColumnType("datetime");
                entity.Property(x => x.CreateUser).HasMaxLength(100);
                entity.Property(x => x.UpdateUser).HasMaxLength(100);
                entity.HasOne(x => x.TradeMark).WithMany(x => x.Products)
                                                .HasForeignKey(x => x.PlaceProductId)
                                                .HasConstraintName("FK_TradeMark_Products")
                                                .OnDelete(DeleteBehavior.ClientSetNull);
                entity.HasOne(x => x.UnitCaculate).WithMany(x => x.Products)
                                              .HasForeignKey(x => x.UnitCaculateId)
                                              .HasConstraintName("FK_UnitCaculate_Products")
                                              .OnDelete(DeleteBehavior.ClientSetNull);
                entity.HasOne(x => x.PlaceProduct).WithMany(x => x.Products)
                                           .HasForeignKey(x => x.PlaceProductId)
                                           .HasConstraintName("FK_PlaceProduct_Products")
                                           .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<ImageProduct>(entity =>
            {
                entity.HasKey(x => x.Id).HasName("PK_ImageProduct");
                entity.ToTable("ImageProduct");
                entity.Property(x => x.Id).ValueGeneratedNever();
                entity.Property(x => x.ImageUrl).HasMaxLength(300);
                entity.HasOne(x => x.Product).WithMany(x => x.ImageProducts)
                                           .HasForeignKey(x => x.ProductId)
                                           .HasConstraintName("FK_ItemProduct_Products")
                                           .OnDelete(DeleteBehavior.ClientSetNull);

            });


            modelBuilder.Entity<PaymentMenthod>(entity =>
            {
                entity.HasKey(x => x.Id).HasName("PK_PayMentMethod");
                entity.ToTable("PaymentMenthod");
                entity.Property(x => x.Id).ValueGeneratedOnAdd();
                entity.Property(x => x.Name).HasMaxLength(50);
                entity.Property(x => x.Description).HasMaxLength(300);
            });
            modelBuilder.Entity<StatusOrders>(entity =>
            {
                entity.HasKey(x => x.Id).HasName("PK_StatusOrders");
                entity.ToTable("StatusOrders");
                entity.Property(x => x.Id).ValueGeneratedOnAdd();
                entity.Property(x => x.Name).HasMaxLength(50);
            });


            modelBuilder.Entity<Cart>(entity =>
            {
                entity.HasKey(x => x.Id).HasName("PK_Cart");
                entity.ToTable("Cart");
                entity.Property(x => x.Id).ValueGeneratedNever();
                entity.Property(x => x.CreateAt).HasColumnType("datetime");
                entity.Property(x => x.UpdateAt).HasColumnType("datetime");
                entity.HasOne(x => x.User)
                        .WithOne(x => x.Cart)
                        .HasForeignKey<Cart>(r => r.UserId)
                        .HasConstraintName("FK_Cart_user")
                        .IsRequired(false);
            });

            modelBuilder.Entity<CartItem>(entity =>
            {
                entity.HasKey(x => x.Id).HasName("PK_CartItem");
                entity.ToTable("CartItem");
                entity.Property(x => x.Id).ValueGeneratedNever();
                entity.Property(x => x.Quantity).HasColumnType("int");
                entity.Property(x => x.UnitPrice).HasColumnType("decimal");
                entity.Property(x => x.TotalPrice).HasColumnType("decimal");
                entity.HasOne(x => x.Cart)
                    .WithMany(x => x.CartItems)
                    .HasForeignKey(x => x.CartId)
                    .HasConstraintName("FK_Cart_CartItem")
                    .OnDelete(DeleteBehavior.ClientSetNull);
                entity.HasOne(x => x.Product)
                     .WithMany(x => x.CartItems)
                     .HasForeignKey(x => x.ProductId)
                     .HasConstraintName("FK_Product_CartItem")
                     .OnDelete(DeleteBehavior.ClientSetNull);
                entity.HasOne(x => x.UnitCaculate)
                     .WithMany(x => x.CartItems)
                     .HasForeignKey(x => x.UnitCaculateId)
                     .HasConstraintName("FK_UnitCaculate_CartItem")
                     .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Orders>(entity =>
            {
                entity.HasKey(x => x.Id).HasName("PK_Orders");
                entity.ToTable("Orders");
                entity.Property(x => x.Id).ValueGeneratedOnAdd();
                entity.Property(x => x.OrderDate).HasColumnType("datetime");
                entity.Property(x => x.ShippingAddress).HasMaxLength(300);
                entity.Property(x => x.ShippingFee).HasColumnType("decimal");
                entity.Property(x => x.TotalPrice).HasColumnType("decimal");
                entity.Property(x => x.Note).HasMaxLength(50);
                entity.HasOne(x => x.User)
                   .WithMany(x => x.Orders)
                   .HasForeignKey(x => x.UserId)
                   .HasConstraintName("FK_Orders_UserId")
                   .OnDelete(DeleteBehavior.ClientSetNull);
                entity.HasOne(x => x.PaymentMenthod)
                 .WithMany(x => x.Orders)
                 .HasForeignKey(x => x.PaymentMenthodId)
                 .HasConstraintName("FK_Orders_PaymentMethod")
                 .OnDelete(DeleteBehavior.ClientSetNull);
                entity.HasOne(x => x.StatusOrders)
                   .WithMany(x => x.Orders)
                   .HasForeignKey(x => x.StatusOrdersId)
                   .HasConstraintName("FK_Orders_StatusOrders")
                   .OnDelete(DeleteBehavior.ClientSetNull);
            });
            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.HasKey(x => x.Id).HasName("PK_OrderDetail");
                entity.ToTable("OrderDetail");
                entity.Property(x => x.Id).ValueGeneratedOnAdd();
                entity.Property(x => x.Quantity).HasColumnType("int");
                entity.Property(x => x.UnitPrice).HasColumnType("decimal");
                entity.Property(x => x.TotalPrice).HasColumnType("decimal");
                entity.HasOne(x => x.Orders)
                      .WithMany(x => x.OrderDetails)
                      .HasForeignKey(x => x.OrderId)
                      .HasConstraintName("FK_OrderDetail_Order")
                      .OnDelete(DeleteBehavior.ClientSetNull);
                entity.HasOne(x => x.Product)
                        .WithMany(x => x.OrderDetails)
                        .HasForeignKey(x => x.ProductId)
                        .HasConstraintName("FK_OrderDetail_Product")
                        .OnDelete(DeleteBehavior.ClientSetNull);
                entity.HasOne(x => x.UnitCaculate)
                   .WithMany(x => x.OrderDetails)
                   .HasForeignKey(x => x.UnitCaculateId)
                   .HasConstraintName("FK_OrderDetail_UnitCaculate")
                   .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<OTP>(entity =>
            {
                entity.HasKey(x => x.Id).HasName("PK_OTP");
                entity.ToTable("OTP");
                entity.Property(x => x.Id).ValueGeneratedNever();
                entity.Property(x => x.Email).HasMaxLength(50);
                entity.Property(x => x.Code).HasColumnType("nvarchar(max)");
                entity.Property(x => x.Expiry).HasColumnType("datetime");
            });

        }
    }
}
