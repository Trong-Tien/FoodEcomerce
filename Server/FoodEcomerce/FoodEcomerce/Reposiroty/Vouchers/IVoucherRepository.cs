using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.Vouchers
{
    public interface IVoucherRepository : IBaseRepository<Voucher, VoucherModal, VoucherDTO , int>
    {

    }
}
