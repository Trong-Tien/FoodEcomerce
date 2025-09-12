using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;
using Microsoft.EntityFrameworkCore;

namespace FoodEcomerce.Reposiroty.MenuRoles
{
    public class MenuRoleRepository : BaseRepository<MenuRole, MenuRoleModal, MenuRoleDTO, Guid>, IMenuRoleRepository
    {
        private readonly FoodDbContex _context;
        private readonly IMapper _mapper;   
        public MenuRoleRepository(FoodDbContex dbContext, IMapper mapper) : base(dbContext, mapper)
        {
            _context = dbContext;
            _mapper = mapper;
        }

        public async Task<List<MenuRoleDTO>> GetAllByRole(Guid roleId)
        {
           return  _mapper.Map<List<MenuRoleDTO>>(await _context.MenuRoles.Where(r => r.RoleId == roleId).ToListAsync()); 
        }
    }
}
