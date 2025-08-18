
using FoodEcomerce.Abstract;
using Microsoft.AspNetCore.Mvc;

namespace FoodEcomerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        public UserController( UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;   
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var result = await _unitOfWork.Users.GetAll();  
                return Ok(result);
            }
            catch (Exception ex) { 
              return BadRequest(ex.Message);
            }
        }
    }
}
