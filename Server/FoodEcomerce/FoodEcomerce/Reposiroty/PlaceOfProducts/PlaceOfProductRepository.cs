using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.PlaceOfProducts
{
    public class PlaceOfProductRepository : BaseRepository<PlaceProduct, PlaceOfProductModal, PlaceOfProductDTO, int>, IPlaceOfProduct
    {
        public PlaceOfProductRepository(FoodDbContex dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }
    }
}
