namespace FoodEcomerce.Modal
{
    public class ProductModal
    {
        public Guid Id { get; set; }
        public string? ManagementCode { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal UnitPrice { get; set; } // đơn giá
        public int QuantityInStock { get; set; } // số lượng tồn
        public decimal TotalPrice { get; set; }
        public decimal SalePrice { get; set; }
        public int? Inventory { get; set; }
        public int Discount { get; set; }
        public bool IsActive { get; set; }
        public string? Expiry { get; set; }  // hạn sử dụng
        public string? Preserve { get; set; }    // bảo quản
        // foreign key
        public Guid UnitCaculateId { get; set; }
        public int TradeMarkId { get; set; }
        public int PlaceProductId { get; set; }
        public List<IFormFile>? ImageUrl { get; set; }
        public List<Guid>? CategoryId { get; set; }
    }
}
