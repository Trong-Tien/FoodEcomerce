using FoodEcomerce.Abstract;
using FoodEcomerce.Modal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodEcomerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly UnitOfWork unitOfWork; 
        public ProductController (UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromForm ]ProductModal modal)
        {
            try
            {
                var result =  await unitOfWork.ProductRepository.CreateWithQuery(modal);  
                return Ok(result);
            }
            catch (Exception ex) { 
              return BadRequest(ex.Message);    
            }
        }
    }
}
