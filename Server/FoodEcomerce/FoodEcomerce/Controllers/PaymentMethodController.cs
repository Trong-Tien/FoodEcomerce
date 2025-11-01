using FoodEcomerce.Abstract;
using FoodEcomerce.Modal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodEcomerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentMethodController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        public PaymentMethodController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll(int pageNumber, int pageSize)
        {
            try
            {
                var result = await _unitOfWork.PaymendMethodRepository.GetAll(pageNumber, pageSize);
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
                var result = await _unitOfWork.PaymendMethodRepository.GetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("Create")]
        public async Task<IActionResult> Create(PayMentMethodModal modal)
        {
            try
            {
                var result = await _unitOfWork.PaymendMethodRepository.Create(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("Update")]
        public async Task<IActionResult> Update(PayMentMethodModal modal)
        {
            try
            {
                var result = await _unitOfWork.PaymendMethodRepository.Update(modal);
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
                var result = await _unitOfWork.PaymendMethodRepository.Delete(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
