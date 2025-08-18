namespace FoodEcomerce.Entity
{
    public class CartItem
    {
        public Guid Id { get; set; }    
        public Guid CartId { get; set; }
        public Guid ProductId { get; set; }
        public Guid UnitCaculateId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public Cart? Cart { get; set; }
        public Product? Product { get; set; }
        public UnitCaculate? UnitCaculate { get; set; }


    }
}
