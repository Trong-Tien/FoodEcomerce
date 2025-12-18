namespace FoodEcomerce.Modal
{
    public class VnPayRequest
    {
        public string OrderId { get; set; }
        public long Amount { get; set; }
        public string OrderInfo { get; set; }
    }
}
