using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Entity.StoreProcedure;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.VoucherUsers
{
    public interface IVoucherUserRepository : IBaseRepository<VoucherUser , VoucherUserModal , VoucherUserDTO, int>
    {
        Task<ResultModal> CreateWithQuery(VoucherUserModal modal);
        Task<List<sp_WebFood_GetAllVoucherUser>> GetVoucherByUserId(Guid userId);
        
    }
}
