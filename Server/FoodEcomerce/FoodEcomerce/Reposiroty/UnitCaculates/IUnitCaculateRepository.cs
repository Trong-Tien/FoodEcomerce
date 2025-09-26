using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.UnitCaculates
{
    public interface IUnitCaculateRepository : IBaseRepository<UnitCaculate , UnitCaculateModal , UnitCaculateDTO , Guid>
    {
        Task<List<UnitCaculateDTO>> GetByParent();
        Task<ResultModal> CreateByQuery(UnitCaculateModal Modal);  
    }
}
