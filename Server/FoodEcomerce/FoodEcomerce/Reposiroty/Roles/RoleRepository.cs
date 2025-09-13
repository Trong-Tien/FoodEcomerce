using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;
using Microsoft.EntityFrameworkCore;

namespace FoodEcomerce.Reposiroty.Roles
{
    public class RoleRepository : BaseRepository<Role, RoleModal, RoleDTO, Guid>, IRoleRepository
    {
        private readonly FoodDbContex  _foodDbContex;
        public RoleRepository(FoodDbContex dbContext, IMapper mapper) : base(dbContext, mapper)
        {
            _foodDbContex = dbContext;  
        }

        public async Task<ResultModal> PermissionGroup(List<MenuPermission> permissionModal , Guid roleId)
        {
            var dataMenuRole = _foodDbContex.MenuRoles.Where(r => r.RoleId == roleId);
            try
            {
                if (dataMenuRole != null) {
                    _foodDbContex.MenuRoles.RemoveRange(dataMenuRole);
                    await _foodDbContex.SaveChangesAsync(); 
                }
                foreach (var item in permissionModal)
                {
                    MenuRole menuRole = new MenuRole();
                    menuRole.MenuId = item.MenuId;
                    menuRole.RoleId = item.RoleId;
                    menuRole.Watch = item.Watch;
                    menuRole.Add = item.Add;
                    menuRole.Update = item.Update;
                    menuRole.Delete = item.Delete;  
                    _foodDbContex.MenuRoles.Add(menuRole);
                }
                await _foodDbContex.SaveChangesAsync();
                return new ResultModal { Status = 200, Success = true, Message = "Phân quyền thành công"};
            }
            catch (Exception ex) { 
              return  new ResultModal { Status = 500 , Success = false, Message = ex.Message }; 
            }
        }
    }
}
