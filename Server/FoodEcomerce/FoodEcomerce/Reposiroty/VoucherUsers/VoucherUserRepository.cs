using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Entity.StoreProcedure;
using FoodEcomerce.Modal;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
namespace FoodEcomerce.Reposiroty.VoucherUsers
{
    public class VoucherUserRepository : BaseRepository<VoucherUser, VoucherUserModal, VoucherUserDTO, int>, IVoucherUserRepository
    {
        private readonly FoodDbContex _context;
        private readonly StoreDbcontext _storeContext;
        public VoucherUserRepository(FoodDbContex dbContext, IMapper mapper, StoreDbcontext storeContext) : base(dbContext, mapper)
        {
            _context = dbContext;
            _storeContext = storeContext;
        }

        public async Task<ResultModal> CreateWithQuery(VoucherUserModal modal)
        {
            try
            {
                var voucherData = _context.Voucher.FirstOrDefault(r => r.Id == modal.VoucherId);

                if (voucherData == null)
                {
                    return new ResultModal() { Status = 202, Message = "Không tìm thấy voucher", Success = false };
                }

                var currentDate = DateTime.Now;

                if (voucherData.EndTime <= currentDate)
                {
                    return new ResultModal() { Status = 202, Message = "Voucher đã kết thúc", Success = false };
                }

                if (voucherData.UsageLimit <= voucherData.UsedCount)
                {
                    return new ResultModal() { Status = 202, Message = "Voucher này đã hết lượt sử dụng", Success = false };
                }

                var userExists = _context.Users.Any(u => u.Id == modal.UserId);
                if (!userExists)
                {
                    return new ResultModal() { Status = 202, Message = "Người dùng không tồn tại", Success = false };
                }
                var checkExist = _context.VoucherUser
                    .FirstOrDefault(v => v.UserId == modal.UserId && v.VoucherId == modal.VoucherId);

                if (checkExist == null)
                {
                    var voucherUser = new VoucherUser
                    {
                        UserId = modal.UserId,
                        VoucherId = modal.VoucherId,
                        IsUsed = false,
                        UsedAt = null
                    };

                    _context.VoucherUser.Add(voucherUser); 
                }

                voucherData.UsedCount += 1;
                _context.Voucher.Update(voucherData);

                await _context.SaveChangesAsync();

                return new ResultModal() { Status = 200, Message = "Lưu voucher thành công", Success = true };

            }
            catch (Exception ex) {

                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };
            }
           

        }

        public async Task<List<sp_WebFood_GetAllVoucherUser>> GetVoucherByUserId(Guid userId)
        {
            var result = await _storeContext.sp_WebFood_GetAllVoucherUser.FromSql($"Execute sp_WebFood_GetAllVoucherUser @userId={userId}").ToListAsync();
            return result;
        }
    }
}
