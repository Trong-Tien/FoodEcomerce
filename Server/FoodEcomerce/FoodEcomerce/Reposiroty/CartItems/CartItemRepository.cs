using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.CartItems
{
    public class CartItemRepository : BaseRepository<CartItem, CartItemModa, CartItemDTO, Guid>, ICartItemRepository
    {
        public CartItemRepository(FoodDbContex dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }
    }
}
