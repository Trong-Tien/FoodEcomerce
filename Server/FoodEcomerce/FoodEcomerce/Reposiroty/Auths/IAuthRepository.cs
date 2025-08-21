using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.Auths
{
    public interface IAuthRepository
    {
        Task<ResultModal> Register(RegisterModal modal);
        Task<LoginDTO> Login(LoginModal modal);
        Task<ResultModal> LoginWithMail(string token);
        Task<ResultModal> ResetPassword(ResetPasswordModal modal);
    }
}
