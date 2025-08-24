using FoodEcomerce.Abstract;
using FoodEcomerce.Modal;
using Microsoft.AspNetCore.Mvc;

namespace FoodEcomerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;

        public CategoryController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;   
        }

        [HttpGet("GetAll")]
        public  async Task<IActionResult> GetAll(int pageNumber , int pagesize)
        {
            try
            {
                var result = await _unitOfWork.CategoryDepository.GetAll(pageNumber, pagesize);
                return Ok(result);
            }
            catch (Exception ex) { 
              return BadRequest(ex.Message);    
            }
        }
        [HttpGet("GetById")]
        public async Task<IActionResult> GetById(Guid id)
        {
            try
            {
                var result = await _unitOfWork.CategoryDepository.GetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromForm] CategoryModal modal)
        {
            try
            {
                var result = await _unitOfWork.CategoryDepository.Create(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromForm] CategoryModal modal)
        {
            try
            {
                var result = await _unitOfWork.CategoryDepository.Update(modal);
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
                var result = await _unitOfWork.CategoryDepository.Delete(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
