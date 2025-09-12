using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.Roles
{
    public interface IRoleRepository : IBaseRepository<Role , RoleModal , RoleDTO , Guid> 
    {
        Task<ResultModal> PermissionGroup(List<MenuPermission> permissionModal , Guid roleId );
    }
}
