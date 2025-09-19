using AutoMapper;
using FoodEcomerce.Entity;
using FoodEcomerce.Reposiroty.Auths;
using FoodEcomerce.Reposiroty.Banners;
using FoodEcomerce.Reposiroty.Categorys;
using FoodEcomerce.Reposiroty.Menus;
using FoodEcomerce.Reposiroty.Roles;
using FoodEcomerce.Reposiroty.UnitCaculates;
using FoodEcomerce.Reposiroty.Users;

namespace FoodEcomerce.Abstract
{
    public sealed class UnitOfWork : IDisposable
    {
        private readonly FoodDbContex _dbContext;
        private readonly IMapper _mapper;
        private IUserRepository _userRepository;
        private IBannerRepository _bannerRepository;
        private IAuthRepository _authRepository;
        private ICategoryDepository _categoryRepository;
        private IUnitCaculateRepository _unitCaculateRepository;
        private IMenuRepository _menuRepository;
        private IRoleRepository _roleRepository;

        public UnitOfWork(FoodDbContex dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public IUserRepository UserRepository
        => _userRepository ??= new UserRepository(_dbContext, _mapper);
        public IBannerRepository PannerRepository
        => _bannerRepository ??= new PannerRepository(_dbContext, _mapper);
        public IAuthRepository AuthRepository
        => _authRepository ??= new AuthRepository(_dbContext, _mapper);
        public ICategoryDepository CategoryDepository
        => _categoryRepository ??= new CategoryRepository(_dbContext, _mapper);
        public IUnitCaculateRepository UnitCaculateRepository
           => _unitCaculateRepository ??= new UnitCaculateRepository(_dbContext, _mapper);
        public IMenuRepository MenuRepository
          => _menuRepository ??= new MenuRepository(_dbContext, _mapper);
        public IRoleRepository RoleRepository
        => _roleRepository ??= new RoleRepository(_dbContext, _mapper);
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
