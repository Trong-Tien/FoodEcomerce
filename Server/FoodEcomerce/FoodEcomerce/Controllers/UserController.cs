
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
        public async Task<IActionResult> GetAll(int pageNumber , int PageSize)
        {
            try
            {
                var result = await _unitOfWork.UserRepository.GetAll(pageNumber, PageSize);  
                return Ok(result);
            }
            catch (Exception ex) { 
              return BadRequest(ex.Message);
            }
        }
    }
}
