using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.Banners
{
    public class PannerRepository : BaseRepository<Panner, PannerModal, PannerDTO, int>, IBannerRepository
    {
        public PannerRepository(FoodDbContex dbContext, IMapper mapper) : base(dbContext, mapper)
        {

        }
    }
}
