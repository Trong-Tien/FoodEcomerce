using FoodEcomerce.Entity;
using FoodEcomerce.Reposiroty.Users;
using Microsoft.EntityFrameworkCore;

namespace FoodEcomerce.Abstract
{
    public sealed class UnitOfWork : IDisposable
    {
        private readonly FoodDbContex _dbContext;
        private  IUserRepository  _userRepository;

        public UnitOfWork(FoodDbContex dbContext ) 
        {
            _dbContext = dbContext;
        }
        public IUserRepository Users
        => _userRepository ??= new UserRepository(_dbContext);

        public bool Save()
        {
            bool isSuccess = _dbContext.SaveChanges() > 0;
            return isSuccess;
        }
        public void Dispose()
        {
            if (_dbContext == null) return;
            _dbContext.Dispose();
        }
    }
}
