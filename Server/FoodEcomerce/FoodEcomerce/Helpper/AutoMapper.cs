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
            CreateMap<UserModal, User>();
            CreateMap<Panner, PannerDTO>();
            CreateMap<PannerModal, Panner>().
                     ForMember(dest => dest.ImageUrl, opt => opt.
                     MapFrom(src => src.ImageUrl != null ? Helpper.Untils.UploadFileImage(src.ImageUrl, "Banner")
                     : null));
            CreateMap<CategoryModal, Category>().
                   ForMember(dest => dest.ImageUrl, opt => opt.
                   MapFrom(src => src.ImageUrl != null ? Helpper.Untils.UploadFileImage(src.ImageUrl, "Categorys")
                   : null));
            CreateMap<RegisterModal, User>();
            CreateMap<UnitCaculate, UnitCaculateModal>();
            CreateMap<UnitCaculateModal, UnitCaculate>();
            CreateMap<Menu, MenuModal>();
            CreateMap<MenuModal, Menu>();


        }
    }
}
