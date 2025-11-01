using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.Auths
{
    public interface IAuthRepository
    {
        Task<ResultModal> Register(RegisterModal modal);
        Task<LoginDTO> Login(LoginModal modal);
        Task<LoginDTO> LoginWithWebUser(LoginWithWebUserModal modal);
        Task<ResultModal> LoginWithMail(string token);
        Task<ResultModal> ResetPassword(ResetPasswordModal modal);



        Task<LoginDTO> LoginWithGoogle(GoogleLoginModal modal);
        Task<LoginDTO> LoginWithFacebook(FacebookLoginModal modal);
    }
}
