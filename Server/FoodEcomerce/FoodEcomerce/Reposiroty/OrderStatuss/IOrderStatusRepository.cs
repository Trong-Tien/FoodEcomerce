using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.OrderStatuss
{
    public interface IOrderStatusRepository : IBaseRepository<OrderStatus , OrderStatusModal , OrderStatusDTO , Guid>
    {
    }
}
