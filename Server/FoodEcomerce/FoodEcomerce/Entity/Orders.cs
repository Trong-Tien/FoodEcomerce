namespace FoodEcomerce.Entity
{
    public class Orders
    {
        public Guid Id { get; set; }
        public DateTime OrderDate { get; set; }
        public string? ShippingAddress { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal ShippingFee { get; set; }
        public string? Note { get; set; }
        // Foreign Key
        public Guid UserId { get; set; }
        public int OrderStatusId { get; set; }
        public int PaymentMenthodId { get; set; }
        public int? StatusOrdersId { get; set; }
        public int StatusId { get; set; }
        public int? VoucherId { get; set; }
        public User? User { get; set; }
        public PaymentMenthod? PaymentMenthod { get; set; }
        public StatusOrders? StatusOrders { get; set; }  
        public Voucher? Voucher { get; set; }   
        public OrderStatus? OrderStatus { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();   
    }
}
