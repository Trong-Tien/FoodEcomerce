using FoodEcomerce.DTO;
using FoodEcomerce.Helpper;
using FoodEcomerce.Modal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodEcomerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IConfiguration _config;

        public PaymentController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody] CreatePaymentDto dto)
        {
            try
            {
                var vnpay = new VnPayHelper();

                vnpay.Add("vnp_Version", "2.1.1");
                vnpay.Add("vnp_Command", "pay");
                vnpay.Add("vnp_TmnCode", _config["VnPay:TmnCode"]);

                vnpay.Add("vnp_Amount", (dto.Amount * 100).ToString());
                vnpay.Add("vnp_CurrCode", "VND");
                vnpay.Add("vnp_TxnRef", Guid.NewGuid().ToString("N"));
                vnpay.Add("vnp_OrderInfo", "Thanh toan don hang");
                vnpay.Add("vnp_OrderType", "billpayment");
                vnpay.Add("vnp_Locale", "vn");
                vnpay.Add("vnp_ReturnUrl", _config["VnPay:ReturnUrl"]);

                vnpay.Add("vnp_IpAddr", "127.0.0.1");

                vnpay.Add("vnp_CreateDate",
                    DateTime.Now.ToString("yyyyMMddHHmmss"));

                vnpay.Add("vnp_ExpireDate",
                    DateTime.Now.AddMinutes(15).ToString("yyyyMMddHHmmss"));

                var paymentUrl = vnpay.CreatePaymentUrl(
                    _config["VnPay:BaseUrl"],          
                    ApiKeyVN.VnPayApiKey             
                );


                return Ok(new PaymentResponseDTO() { status = 200 , message ="ok" , Url = paymentUrl });
            }
            catch(Exception ex)
            {
                return BadRequest(new PaymentResponseDTO() {status = 500 , message = ex.Message , Url = null });
            }   
           
        }
        //[HttpGet("vnpay-return")]
        //public IActionResult VnPayReturn()
        //{
        //    var response = Request.Query
        //        .ToDictionary(x => x.Key, x => x.Value.ToString());

        //    bool isValid = VnPayHelper.ValidateResponse(
        //        response,
        //        ApiKeyVN.VnPayApiKey
        //    );

        //    if (isValid && response["vnp_ResponseCode"] == "00")
        //    {
        //        var orderId = response["vnp_TxnRef"];
        //        var amount = long.Parse(response["vnp_Amount"]) / 100;

        //    }

        //    return Redirect("http://localhost:3000/payment-result");
        //}
    }
}
