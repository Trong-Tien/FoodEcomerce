using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.Categorys
{
    public interface ICategoryDepository : IBaseRepository<Category, CategoryModal, CategoryDTO, Guid>
    {
        Task<List<CategoryDTO>> GetAllParent();
    }
}
