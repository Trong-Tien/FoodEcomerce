using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.MenuRoles
{
    public interface IMenuRoleRepository : IBaseRepository<MenuRole , MenuRoleModal , MenuRoleDTO , Guid>
    {
        Task<List<MenuRoleDTO>> GetAllByRole(Guid roleId);
    }
}
