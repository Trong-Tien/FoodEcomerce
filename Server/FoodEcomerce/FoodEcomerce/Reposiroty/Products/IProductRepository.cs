using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.Products
{
    public interface IProductRepository : IBaseRepository<Product, ProductModal, ProductDTO, Guid>
    {
        Task<ResultModal> Create(ProductModal modal);
    }
}
