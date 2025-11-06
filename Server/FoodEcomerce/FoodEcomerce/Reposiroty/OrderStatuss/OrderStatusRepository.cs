using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.OrderStatuss
{
    public class OrderStatusRepository : BaseRepository<OrderStatus, OrderStatusModal, OrderStatusDTO, Guid>, IOrderStatusRepository
    {
        public OrderStatusRepository(FoodDbContex dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }
    }
}
