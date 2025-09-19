using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.Menus
{
    public class MenuRepository : BaseRepository<Menu, MenuModal, MenuDTO, Guid>, IMenuRepository
    {
        public MenuRepository(FoodDbContex dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }
    }
}
