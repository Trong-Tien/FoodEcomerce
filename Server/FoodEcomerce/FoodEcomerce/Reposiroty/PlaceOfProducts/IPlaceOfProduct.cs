using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.PlaceOfProducts
{
    public interface IPlaceOfProduct : IBaseRepository<PlaceProduct , PlaceOfProductModal , PlaceOfProductDTO , int>
    {

    }
}
