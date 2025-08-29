using FoodEcomerce.Abstract;
using FoodEcomerce.Modal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodEcomerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;

        public RoleController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("GetAll")]
        //[Authorize]
        public async Task<IActionResult> GetAll(int pageNumber, int pagesize)
        {
            try
            {
                var result = await _unitOfWork.RoleRepository.GetAll(pageNumber, pagesize);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("GetById")]
        public async Task<IActionResult> GetById(Guid id)
        {
            try
            {
                var result = await _unitOfWork.RoleRepository.GetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("Create")]
        public async Task<IActionResult> Create(RoleModal modal)
        {
            try
            {
                var result = await _unitOfWork.RoleRepository.Create(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("Update")]
        public async Task<IActionResult> Update(RoleModal modal)
        {
            try
            {
                var result = await _unitOfWork.RoleRepository.Update(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                var result = await _unitOfWork.RoleRepository.Delete(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
