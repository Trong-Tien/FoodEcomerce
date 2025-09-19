using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.Menus
{
    public interface IMenuRepository : IBaseRepository<Menu , MenuModal , MenuDTO , Guid>
    {
    }
}
