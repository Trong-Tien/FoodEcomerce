using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.TradeMarks
{
    public class TradeMarkRepository(FoodDbContex dbContext, IMapper mapper) : BaseRepository<TradeMark, TradeMarkModal, TradeMarkDTO, int>(dbContext, mapper) , ITRadeMarkRepository
    {

    }
}
