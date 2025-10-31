using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.Orderss
{
    public interface IOrderRepository: IBaseRepository<Orders , OrderModal , OrderDTO , Guid>
    {
        Task<ResultModal> CreateWithQuery(OrderModal modal);    
        Task<ResultModal> UpdateWithQuery(Guid orderId , int type);    
    }
}
