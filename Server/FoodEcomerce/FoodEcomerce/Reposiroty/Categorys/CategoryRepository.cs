using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;
using Microsoft.EntityFrameworkCore;

namespace FoodEcomerce.Reposiroty.Categorys
{
    public class CategoryRepository : BaseRepository<Category, CategoryModal, CategoryDTO, Guid>, ICategoryDepository
    {
        private readonly FoodDbContex _foodDbContex;
        private readonly IMapper _mapper;
        public CategoryRepository(FoodDbContex dbContext, IMapper mapper) : base(dbContext, mapper)
        {
            _foodDbContex = dbContext;
            _mapper = mapper;   
        }

        public async Task<List<CategoryDTO>> GetAllParent()
        {
            return _mapper.Map<List<CategoryDTO>>( await _foodDbContex.Categories.Where(r=> r.CategoryParentId == null).ToListAsync());
        }
    }
}
