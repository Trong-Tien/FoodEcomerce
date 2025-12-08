using Microsoft.EntityFrameworkCore;

namespace FoodEcomerce.Entity.StoreProcedure
{
    public class StoreDbcontext : DbContext
    {
        public StoreDbcontext(DbContextOptions<StoreDbcontext> options) : base(options)
        {

        }
        public virtual DbSet<sp_WebFood_GetMenuByRole> Sp_WebFood_GetMenuByRole { get; set; }
        public virtual DbSet<sp_WebFood_GetAllProduct> sp_WebFood_GetAllProduct { get; set; }
        public virtual DbSet<sp_WebFood_GetAllProductImage> sp_WebFood_GetAllProductImage { get; set; }
        public virtual DbSet<sp_WebFood_GetAllProductCategory> sp_WebFood_GetAllProductCategory { get; set; }
        public virtual DbSet<sp_WebFood_GetAllVoucherUser> sp_WebFood_GetAllVoucherUser { get; set; }
        public virtual DbSet<sp_WebFood_GetAllOrders> sp_WebFood_GetAllOrders { get; set; }
        public virtual DbSet<sp_WebFood_GetAllOrdersDetail> sp_WebFood_GetAllOrdersDetail { get; set; }
        public virtual DbSet<sp_WebFood_Report_Total> sp_WebFood_Report_Total { get; set; }

    }
}
