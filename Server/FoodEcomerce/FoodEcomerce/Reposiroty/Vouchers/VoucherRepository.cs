using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;
using System;

namespace FoodEcomerce.Reposiroty.Vouchers
{
    public class VoucherRepository : BaseRepository<Voucher, VoucherModal, VoucherDTO, int>, IVoucherRepository
    {
        private readonly FoodDbContex _dbContext;   
        public VoucherRepository(FoodDbContex dbContext, IMapper mapper) : base(dbContext, mapper)
        {
            _dbContext = dbContext;
        }

        public async Task<ResultModal> UpdateWithQuery(UpdateVoucherModal modal)
        {
            var data = _dbContext.Voucher.Where(e => e.Id == modal.Id).FirstOrDefault();
            if (data != null) { 
                data.Name = modal.Name;
                data.Description = modal.Description;
                data.DiscountType = modal.DiscountType;
                data.DiscountValue = modal.DiscountValue;
                data.MinOrderAmount = modal.MinOrderAmount;
                data.MaxDiscountAmount = modal.MaxDiscountAmount;
                data.StartDate = modal.StartDate;
                data.EndTime = modal.EndTime;
                data.UsageLimit = modal.UsageLimit;
                data.UsedCount = modal.UsedCount;
                data.IsActive = modal.IsActive;

                if (data != null && data.GetType().GetProperty("ImageFile")?.GetValue(data) != null)
                {
                    Helpper.Untils.DeleteFile(data.ImageUrl);
                }
                  if( modal.ImageUrl == null)
                {

                    var imageUrl = Helpper.Untils.UploadFileImage(modal.ImageUrl , "Vouchers");
                    data.ImageUrl = imageUrl;
                }   
                    
                _dbContext.Voucher.Update(data);
                await _dbContext.SaveChangesAsync();    
                return new ResultModal() { Status = 200, Message = "Cập nhật thành công", Success = true };
            }
            else
            {
                return new ResultModal() { Status = 200, Message = "Không tìm thấy dữ liệu", Success = true };
            }    
        }
    }
}
