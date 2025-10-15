using FoodEcomerce.Abstract;
using FoodEcomerce.Modal;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodEcomerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PannerController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        public  PannerController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll(int pageNumber , int pageSize)
        {
            try
            {
                var result = await _unitOfWork.PannerRepository.GetAll(pageNumber , pageSize); 
                return Ok(result);  
            }
            catch (Exception ex) { 
               return BadRequest(ex.Message);   
            }
        }
        [HttpGet("GetById")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var result = await _unitOfWork.PannerRepository.GetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromForm]PannerModal modal)
        {
            try
            {
                var result  = await _unitOfWork.PannerRepository.Create(modal);
                return Ok(result);  
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromForm] PannerModal modal )
        {
            try
            {
                var result = await _unitOfWork.PannerRepository.Update(modal );
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
                var result = await _unitOfWork.PannerRepository.Delete(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
