using FoodEcomerce.Entity;
using FoodEcomerce.Modal;
using FoodEcomerce.DTO;
using AutoMapper;
namespace FoodEcomerce.Reposiroty.Carts
{
    public class CartRepository : BaseRepository<Cart, CartModal, CartDTO, Guid>, ICartRepository
    {
        public CartRepository(FoodDbContex dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }
    }
}
