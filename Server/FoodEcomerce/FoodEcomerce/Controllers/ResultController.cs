using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodEcomerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultController : ControllerBase
    {
        private readonly Abstract.UnitOfWork _unitOfWork;
        public ResultController(Abstract.UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [HttpGet("report-total/{type}")]
        public async Task<IActionResult> GetReportTotalAsync(int type)
        {
            var result = await _unitOfWork.resultRepository.GetReportTotalAsync(type);
            return Ok(result);
        }
    }
}
