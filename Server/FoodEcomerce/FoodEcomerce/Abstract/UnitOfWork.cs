using AutoMapper;
using FoodEcomerce.Entity;
using FoodEcomerce.Reposiroty.Banners;
using FoodEcomerce.Reposiroty.Users;
using Microsoft.EntityFrameworkCore;

namespace FoodEcomerce.Abstract
{
    public sealed class UnitOfWork : IDisposable
    {
        private readonly FoodDbContex _dbContext;
        private readonly IMapper _mapper;
        private  IUserRepository  _userRepository;
        private IBannerRepository _bannerRepository;

        public UnitOfWork(FoodDbContex dbContext , IMapper mapper ) 
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public IUserRepository UserRepository
        => _userRepository ??= new UserRepository(_dbContext, _mapper);

        public IBannerRepository PannerRepository 
        => _bannerRepository ??= new PannerRepository(_dbContext, _mapper);  

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
