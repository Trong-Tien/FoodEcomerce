using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.Roles
{
    public class RoleRepository : BaseRepository<Role, RoleModal, RoleDTO, Guid>, IRoleRepository
    {
        public RoleRepository(FoodDbContex dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }
    }
}
