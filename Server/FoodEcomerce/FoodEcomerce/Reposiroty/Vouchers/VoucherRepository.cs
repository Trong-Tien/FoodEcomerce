using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.Vouchers
{
    public class VoucherRepository : BaseRepository<Voucher, VoucherModal, VoucherDTO, int>, IVoucherRepository
    {
        public VoucherRepository(FoodDbContex dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }
    }
}
