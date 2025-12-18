namespace FoodEcomerce.Modal
{
    public class CreatePaymentDto
    {
        public string? OrderId { get; set; }
        public long Amount { get; set; }
        public string? Description { get; set; }
    }
}
