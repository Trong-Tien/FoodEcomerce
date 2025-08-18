using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.Users
{
    public class UserRepository : BaseRepository<User, UserModal, UserDTO, Guid>, IUserRepository
    {
        public UserRepository(FoodDbContex dbContext) : base(dbContext)
        {
        }
    }
}
