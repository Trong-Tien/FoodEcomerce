using FoodEcomerce.Abstract;
using FoodEcomerce.Entity.StoreProcedure;
using FoodEcomerce.Modal;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodEcomerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly CurrentUserService _currentUserService;
        public OrdersController(UnitOfWork unitOfWork , CurrentUserService currentUserService)
        {
            _unitOfWork = unitOfWork;
            _currentUserService = currentUserService;
        }

        [HttpGet("GetAll")]
        [Authorize]
        public async Task<IActionResult> GetAll(int type,int pageNumber, int pageSize)
        {
            try
            {
                List<sp_WebFood_GetAllOrders> result = new List<sp_WebFood_GetAllOrders> ();
                Guid? role = _currentUserService.GetRoleId();
                var userId = _currentUserService.GetUserId();
                if(role == Guid.Parse("d9c31537-7661-443e-9e18-418b57074ab8") || role == Guid.Parse("5D8A5421-5277-4098-9587-F211D652332B"))
                {
                    result = await _unitOfWork.OrderRepository.GetAllWithQuery(null, -1, pageNumber, pageSize);
                }
                else result = await _unitOfWork.OrderRepository.GetAllWithQuery(userId, -1, pageNumber, pageSize);

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
                var result = await _unitOfWork.OrderRepository.GetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       

        [HttpPost("Create")]
        public async Task<IActionResult> Create(OrderModal modal)
        {
            try
            {
                var result = await _unitOfWork.OrderRepository.CreateWithQuery(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException?.Message ?? ex.Message);
            }

        }
        [HttpPut("Update")]
        public async Task<IActionResult> Update(Guid orderId , int type)
        {
            try
            {
                var result = await _unitOfWork.OrderRepository.UpdateWithQuery(orderId , type);
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
                var result = await _unitOfWork.OrderRepository.Delete(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
