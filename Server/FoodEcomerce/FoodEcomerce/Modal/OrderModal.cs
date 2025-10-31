namespace FoodEcomerce.Modal
{
    public class OrderModal
    {
        public Guid Id { get; set; }
        public DateTime OrderDate { get; set; }
        public string? ShippingAddress { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal ShippingFee { get; set; }
        public string? Note { get; set; }
        // Foreign Key
        public Guid UserId { get; set; }
        public int PaymentMenthodId { get; set; }
        public int? VoucherId { get; set; } 
        public List<OrdersDetailModal>? OrdersDetails { get; set; }
    }
}
