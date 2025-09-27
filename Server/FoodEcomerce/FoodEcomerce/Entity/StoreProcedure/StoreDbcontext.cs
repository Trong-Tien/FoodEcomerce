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

    }
}
