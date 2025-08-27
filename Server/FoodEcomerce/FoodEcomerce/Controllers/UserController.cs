
using FoodEcomerce.Abstract;
using FoodEcomerce.Modal;
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


        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll(int pageNumber, int pageSize)
        {
            try
            {
                var result = await _unitOfWork.UserRepository.GetAll(pageNumber, pageSize);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("GetById")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var result = await _unitOfWork.UserRepository.GetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create(UserModal modal)
        {
            try
            {
                var result = await _unitOfWork.UserRepository.CreateWithQuery(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromForm] UserModal modal)
        {
            try
            {
                var result = await _unitOfWork.UserRepository.Update(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var result = await _unitOfWork.UserRepository.Delete(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
