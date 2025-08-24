using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.Categorys
{
    public class CategoryRepository : BaseRepository<Category, CategoryModal, CategoryDTO, Guid>, ICategoryDepository
    {
        public CategoryRepository(FoodDbContex dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }
    }
}
