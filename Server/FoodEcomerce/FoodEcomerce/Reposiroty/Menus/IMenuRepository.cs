using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Entity.StoreProcedure;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.Menus
{
    public interface IMenuRepository : IBaseRepository<Menu , MenuModal , MenuDTO , Guid>
    {
        Task<List<sp_WebFood_GetMenuByRole>> GetMenuPermission(Guid roleId);
    }
}
