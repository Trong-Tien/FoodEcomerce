using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.CartItems
{
    public interface ICartItemRepository : IBaseRepository<CartItem, CartItemModa, CartItemDTO, Guid>
    {

    }
}
