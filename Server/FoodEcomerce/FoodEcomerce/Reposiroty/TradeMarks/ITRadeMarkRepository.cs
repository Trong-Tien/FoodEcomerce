using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.TradeMarks
{
    public interface ITRadeMarkRepository : IBaseRepository<TradeMark , TradeMarkModal , TradeMarkDTO , int>
    {
    }
}
