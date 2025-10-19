using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;
namespace FoodEcomerce.Reposiroty.VoucherUsers
{
    public class VoucherUserRepository : BaseRepository<VoucherUser, VoucherUserModal, VoucherUserDTO, int>, IVoucherUserRepository
    {
        public VoucherUserRepository(FoodDbContex dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }
    }
}
