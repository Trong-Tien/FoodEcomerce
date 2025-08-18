using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty
{
    public interface IBaseRepository<T , TModal, TDto , TId> where T : class
    {
        Task<List<TDto>> GetAll();
        Task<TDto> GetById(T entity);
        Task<ResultModal> Create(TModal entity);
        Task<ResultModal> Update(TModal entity);
        Task<ResultModal> Delete(TId id);
    }
}
