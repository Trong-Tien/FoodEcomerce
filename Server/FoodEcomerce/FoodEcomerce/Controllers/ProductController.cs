using FoodEcomerce.Abstract;
using FoodEcomerce.Modal;
using Microsoft.AspNetCore.Mvc;

namespace FoodEcomerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly UnitOfWork unitOfWork;
        public ProductController(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
       
        [HttpGet("getall")]
        public async Task<IActionResult> GetAll(int pageNumber, int pageSize, string ids)
        {
            try
            {
                var result = await unitOfWork.ProductRepository.GetAll(pageNumber, pageSize, ids);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("GetProductImage/{productId}")]
        public async Task<IActionResult> GetProductImage(Guid productId)
        {
            try
            {
                var result = await unitOfWork.ProductRepository.GetProductImage(productId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("GetProductCategory/{productId}")]
        public async Task<IActionResult> GetProductCategory(Guid productId)
        {
            try
            {
                var result = await unitOfWork.ProductRepository.GetProductCategory(productId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromForm] ProductModal modal)
        {
            try
            {
                var result = await unitOfWork.ProductRepository.CreateWithQuery(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateQuery([FromForm] ProductModal modal)
        {
            try
            {
                var result = await unitOfWork.ProductRepository.UpdateWithQuery(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete/{productId}")]
        public async Task<IActionResult> DeleteWithQuery(Guid productId)
        {
            try
            {
                var result = await unitOfWork.ProductRepository.DeleteWithQuery(productId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
