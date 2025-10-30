using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Helpper
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<User, UserDTO>();
            CreateMap<UserModal, User>()
                 .ForMember(dest => dest.Password,
                  opt => opt.MapFrom((src, dest) =>
                      src.Password != null ? Helpper.Untils.EncrypePassword(src.Password) : null));

            CreateMap<Panner, PannerDTO>();
            CreateMap<PannerModal, Panner>().
                     ForMember(dest => dest.ImageUrl, opt => opt.
                     MapFrom(src => src.ImageUrl != null ? Helpper.Untils.UploadFileImage(src.ImageUrl, "Banner")
                     : null));
            CreateMap<CategoryModal, Category>().
                   ForMember(dest => dest.ImageUrl, opt => opt.
                   MapFrom(src => src.ImageUrl != null ? Helpper.Untils.UploadFileImage(src.ImageUrl, "Categorys")
                   : null));
            CreateMap<VoucherModal, Voucher>().
                  ForMember(dest => dest.ImageUrl, opt => opt.
                  MapFrom(src => src.ImageUrl != null ? Helpper.Untils.UploadFileImage(src.ImageUrl, "Vouchers")
                  : null));
            CreateMap<Category, CategoryDTO>().ReverseMap();
            CreateMap<RegisterModal, User>();
            CreateMap<UnitCaculate, UnitCaculateModal>();
            CreateMap<UnitCaculateModal, UnitCaculate>();
            CreateMap<Menu, MenuModal>();
            CreateMap<MenuModal, Menu>();
            CreateMap<MenuRole, MenuRoleModal>().ReverseMap();
            CreateMap<MenuRole, MenuRoleDTO>().ReverseMap();
            CreateMap<Product, ProductDTO>().ReverseMap();
            CreateMap<TradeMark, TradeMarkDTO>().ReverseMap();
            CreateMap<PlaceProduct, PlaceOfProductDTO>().ReverseMap();
            CreateMap<ProductCategory, ProductCategoryDTO>().ReverseMap();
            CreateMap<ImageProduct, ImageProductDTO>().ReverseMap();

            CreateMap<CartItemModa, CartItem>().ReverseMap();
            CreateMap<CartItem, CartItemDTO>().ReverseMap();
            CreateMap<VoucherUserModal, VoucherUser>().ReverseMap();
            CreateMap<Orders, OrderModal>().ReverseMap();
            CreateMap<Orders, OrderDTO>().ReverseMap();
            CreateMap<OrderDetail, OrdersDetailModal>().ReverseMap();
            CreateMap<Orders, OrderDTO>().ReverseMap();
            CreateMap<Voucher, VoucherDTO>().ReverseMap();


            CreateMap<VoucherUser, VoucherUserDTO>()
                .ForMember(dest => dest.VoucherDTO, opt => opt.MapFrom(src => src.Voucher))
                .ReverseMap();


        }
    }
}
