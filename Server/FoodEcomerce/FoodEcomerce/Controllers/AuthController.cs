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
    }
}
