using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.Products
{
    public class ProductRepository : BaseRepository<Product, ProductModal, ProductDTO, Guid>, IProductRepository
    {
        public ProductRepository(FoodDbContex dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }
    }
}
