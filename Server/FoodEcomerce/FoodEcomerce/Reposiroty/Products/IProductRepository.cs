using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Entity.StoreProcedure;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.Products
{
    public interface IProductRepository : IBaseRepository<Product, ProductModal, ProductDTO, Guid>
    {
        Task<ResultModal> CreateWithQuery(ProductModal modal);
        Task<List<sp_WebFood_GetAllProduct>> GetAll(int pageNumber, int pageSize, string ids);
    }
}
