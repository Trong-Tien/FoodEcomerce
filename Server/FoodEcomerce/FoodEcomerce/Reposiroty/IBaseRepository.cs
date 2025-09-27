using FoodEcomerce.Modal;
using System.Linq.Expressions;

namespace FoodEcomerce.Reposiroty
{
    public interface IBaseRepository<T , TModal, TDto , TId> where T : class
    {
        Task<BaseResult<T>> GetAll(int pageNumber, int pageSize,params Expression<Func<T, object>>[] includes );
        Task<TDto> GetById(object id , params Expression<Func<T, object>>[] includes);
        Task<ResultModal> Create(TModal entity);
        Task<ResultModal> Update(TModal entity );
        Task<ResultModal> Delete(object id);
        Task<ResultModal> DeleteById(object id);    
    }
}
