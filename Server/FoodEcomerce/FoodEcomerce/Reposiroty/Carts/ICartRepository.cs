using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.Carts
{
    public interface ICartRepository : IBaseRepository<Cart, CartModal, CartDTO, Guid>
    {
        
    }
}
