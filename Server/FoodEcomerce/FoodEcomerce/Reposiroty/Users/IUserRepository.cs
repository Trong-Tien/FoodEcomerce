using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.Users
{
    public interface IUserRepository : IBaseRepository<User , UserModal , UserDTO , Guid>
    {
        Task<ResultModal> CreateWithQuery(UserModal modal);
    }
}
