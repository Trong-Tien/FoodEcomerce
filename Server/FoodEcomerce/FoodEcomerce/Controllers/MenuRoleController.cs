using FoodEcomerce.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodEcomerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuRoleController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        public MenuRoleController(UnitOfWork unitOfWork) { 
           _unitOfWork = unitOfWork;    
        }

        [HttpGet("GetAllByRole/{roleId}")]
        public async Task<IActionResult> GetByRole(Guid roleId)
        {
            try
            {
                var result = await _unitOfWork.MenuRoleReposirory.GetAllByRole(roleId);
                return Ok(result);  
            }
            catch (Exception ex) { 
               return BadRequest(ex.Message);   
            }
        }
    }
}
