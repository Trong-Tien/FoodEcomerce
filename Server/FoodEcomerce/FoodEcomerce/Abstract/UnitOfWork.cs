using AutoMapper;
using FoodEcomerce.Entity;
using FoodEcomerce.Entity.StoreProcedure;
using FoodEcomerce.Reposiroty.Auths;
using FoodEcomerce.Reposiroty.Banners;
using FoodEcomerce.Reposiroty.CartItems;
using FoodEcomerce.Reposiroty.Categorys;
using FoodEcomerce.Reposiroty.MenuRoles;
using FoodEcomerce.Reposiroty.Menus;
using FoodEcomerce.Reposiroty.PlaceOfProducts;
using FoodEcomerce.Reposiroty.Products;
using FoodEcomerce.Reposiroty.Roles;
using FoodEcomerce.Reposiroty.TradeMarks;
using FoodEcomerce.Reposiroty.UnitCaculates;
using FoodEcomerce.Reposiroty.Users;
using FoodEcomerce.Reposiroty.Vouchers;
using FoodEcomerce.Reposiroty.VoucherUsers;

namespace FoodEcomerce.Abstract
{
    public sealed class UnitOfWork : IDisposable
    {
        private readonly FoodDbContex _dbContext;
        private readonly StoreDbcontext _storeDbcontext;
        private readonly IMapper _mapper;
        private IUserRepository _userRepository;
        private IBannerRepository _bannerRepository;
        private IAuthRepository _authRepository;
        private ICategoryDepository _categoryRepository;
        private IUnitCaculateRepository _unitCaculateRepository;
        private IMenuRepository _menuRepository;
        private IRoleRepository _roleRepository;
        private IMenuRoleRepository _menuRoleRepository;
        private IProductRepository _productRepository;
        private ITRadeMarkRepository _tRadeMarkRepository;
        private IPlaceOfProduct _placeOfProduct;
        private ICartItemRepository _cartItemRepository;
        private IVoucherRepository _voucherRepository;
        private IVoucherUserRepository _voucherUserRepository;

        public UnitOfWork(FoodDbContex dbContext, IMapper mapper, StoreDbcontext storeDbcontext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _storeDbcontext = storeDbcontext;
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
          => _menuRepository ??= new MenuRepository(_dbContext, _mapper, _storeDbcontext);
        public IRoleRepository RoleRepository
        => _roleRepository ??= new RoleRepository(_dbContext, _mapper);
        public IMenuRoleRepository MenuRoleReposirory
        => _menuRoleRepository ??= new MenuRoleRepository(_dbContext, _mapper);
        public IProductRepository ProductRepository
        => _productRepository ??= new ProductRepository(_dbContext, _mapper, _storeDbcontext);
        public ITRadeMarkRepository TradeMarkRepository
         => _tRadeMarkRepository ??= new TradeMarkRepository(_dbContext, _mapper);
        public IPlaceOfProduct PlaceOfProductRepository
        => _placeOfProduct ??= new PlaceOfProductRepository(_dbContext, _mapper);

        public ICartItemRepository CartItemRepository
       => _cartItemRepository ??= new CartItemRepository(_dbContext, _mapper);
        public IVoucherRepository VoucherRepository
       => _voucherRepository ??= new VoucherRepository(_dbContext, _mapper);
        public IVoucherUserRepository VoucherUserRepository
     => _voucherUserRepository ??= new VoucherUserRepository(_dbContext, _mapper);

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
