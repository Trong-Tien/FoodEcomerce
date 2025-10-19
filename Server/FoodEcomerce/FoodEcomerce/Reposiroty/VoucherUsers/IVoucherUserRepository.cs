using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.VoucherUsers
{
    public interface IVoucherUserRepository : IBaseRepository<VoucherUser , VoucherUserModal , VoucherUserDTO, int>
    {

    }
}
