using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty
{
    public abstract class BaseRepository<T, TModal, TDto, TId> : IBaseRepository<T, TModal, TDto, TId> where T : class
    {
        private readonly FoodDbContex _dbContext;

        public BaseRepository(FoodDbContex dbContext)
        {
            _dbContext = dbContext;
        }
        public Task<List<TDto>> GetAll()
        {
            throw new NotImplementedException();
        }
        public Task<ResultModal> Create(TModal entity)
        {
            throw new NotImplementedException();
        }

        public Task<ResultModal> Delete(TId id)
        {
            throw new NotImplementedException();
        }
        public Task<TDto> GetById(T entity)
        {
            throw new NotImplementedException();
        }
        public Task<List<TDto>> List()
        {
            throw new NotImplementedException();
        }

        public Task<ResultModal> Update(TModal entity)
        {
            throw new NotImplementedException();
        }
    }
}
