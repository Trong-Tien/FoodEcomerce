using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Entity.StoreProcedure;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.Orderss
{
    public interface IOrderRepository: IBaseRepository<Orders , OrderModal , OrderDTO , Guid>
    {
        Task<ResultModal> CreateWithQuery(OrderModal modal);    
        Task<ResultModal> UpdateWithQuery(Guid orderId , int type);    
        Task<List<sp_WebFood_GetAllOrders>> GetAllWithQuery(Guid? userId , int statusId , int pageNumber , int pageSize);  
        Task<List<sp_WebFood_GetAllOrdersDetail>> GetAllOrderDetailByOrderId(Guid orderId);
    }
}
