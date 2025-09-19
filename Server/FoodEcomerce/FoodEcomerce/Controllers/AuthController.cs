using FoodEcomerce.Abstract;
using FoodEcomerce.Modal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodEcomerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UnitOfWork unitOfWork;
        public AuthController(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginModal modal)
        {
            try
            {
                var result = await unitOfWork.AuthRepository.Login(modal);  
                return  Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("LoginWithWebUser")]
        public async Task<IActionResult> LoginWithWebUser(LoginWithWebUserModal modal)
        {
            try
            {
                var result = await unitOfWork.AuthRepository.LoginWithWebUser(modal);
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.UtcNow.AddHours(1)
                };
                Response.Cookies.Append("jwt", result.AccessToken, cookieOptions);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterModal register)
        {
            try
            {
                var result =await unitOfWork.AuthRepository.Register(register);
                return Ok(result);  
            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new ResultModal{ Status = 200 , Message  = "Logged out" ,Success = true });
        }
    }
}
