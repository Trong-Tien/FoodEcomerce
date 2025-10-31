using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.PaymentMethods
{
    public interface IPaymendMethodRepository : IBaseRepository<PaymentMenthod, PayMentMethodModal , PayMendMethodDTO  , int>
    {

    }
}
