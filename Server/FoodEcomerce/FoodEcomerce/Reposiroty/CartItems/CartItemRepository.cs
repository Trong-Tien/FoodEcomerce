using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;
using Microsoft.EntityFrameworkCore;

namespace FoodEcomerce.Reposiroty.CartItems
{
    public class CartItemRepository : BaseRepository<CartItem, CartItemModa, CartItemDTO, Guid>, ICartItemRepository
    {
        private readonly FoodDbContex _dbContext;   
        private readonly IMapper _mapper;   
        public CartItemRepository(FoodDbContex dbContext, IMapper mapper) : base(dbContext, mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<List<CartItemDTO>> GetCartByAccount(Guid cartId)
        {
          return _mapper.Map<List<CartItemDTO>>(await _dbContext.CartItems.Where(c => c.CartId == cartId).ToListAsync()); 
        }
    }
}
