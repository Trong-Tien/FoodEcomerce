using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.UnitCaculates
{
    public class UnitCaculateRepository : BaseRepository<UnitCaculate, UnitCaculateModal, UnitCaculateDTO, Guid>, IUnitCaculateRepository
    {
        public UnitCaculateRepository(FoodDbContex dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }
    }
}
