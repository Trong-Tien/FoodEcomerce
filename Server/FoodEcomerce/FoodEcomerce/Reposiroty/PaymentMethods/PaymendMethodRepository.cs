using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.PaymentMethods
{
    public class PaymendMethodRepository : BaseRepository<PaymentMenthod, PayMentMethodModal, PayMendMethodDTO, int>, IPaymendMethodRepository
    {
        public PaymendMethodRepository(FoodDbContex dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }
    }
}
