namespace FoodEcomerce.Entity
{
    public class OrderDetail
    {
        public Guid Id { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        //foreignkey
        public Guid OrderId { get; set; }
        public Guid ProductId { get; set; }
        public Guid UnitCaculateId { get; set; }

        public Orders? Orders { get; set; }
        public Product? Product { get; set; }
        public UnitCaculate? UnitCaculate { get; set; }
    }
}
