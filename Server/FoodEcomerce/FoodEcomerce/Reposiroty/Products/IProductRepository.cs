using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Entity.StoreProcedure;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.Products
{
    public interface IProductRepository : IBaseRepository<Product, ProductModal, ProductDTO, Guid>
    {
        Task<ResultModal> CreateWithQuery(ProductModal modal);
        Task<List<sp_WebFood_GetAllProduct>> GetAll(int pageNumber, int pageSize, string ids , int orderType , string keyWord);
        Task<List<sp_WebFood_GetAllProductImage>> GetProductImage(Guid productId);
        Task<List<sp_WebFood_GetAllProductCategory>> GetProductCategory(Guid productId);
        Task<ResultModal> UpdateWithQuery(ProductModal modal);
        Task<ResultModal> DeleteWithQuery(Guid productId);
    }
}
