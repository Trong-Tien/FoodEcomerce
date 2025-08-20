namespace FoodEcomerce.DTO
{
    public class ProductDTO
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal UnitPrice { get; set; } // đơn giá
        public int QuantityInStock { get; set; } // số lượng tồn
        public decimal TotalPrice { get; set; }
        public int Inventory { get; set; }
        public int Discount { get; set; }
        public bool IsActive { get; set; }
    }
}
