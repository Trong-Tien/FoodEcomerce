using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Entity.StoreProcedure;
using FoodEcomerce.Modal;
using Microsoft.EntityFrameworkCore;

namespace FoodEcomerce.Reposiroty.Menus
{
    public class MenuRepository : BaseRepository<Menu, MenuModal, MenuDTO, Guid>, IMenuRepository
    {
        private readonly StoreDbcontext _dbcontext;
        public MenuRepository(FoodDbContex dbContext, IMapper mapper, StoreDbcontext dbcontext) : base(dbContext, mapper)
        {
            _dbcontext = dbcontext;
        }

        public async Task<List<sp_WebFood_GetMenuByRole>> GetMenuPermission(Guid roleId)
        {
            return await _dbcontext.Sp_WebFood_GetMenuByRole.FromSql($"Sp_WebFood_GetMenuByRole @RoleId={roleId}").ToListAsync();
        }
    }
}
