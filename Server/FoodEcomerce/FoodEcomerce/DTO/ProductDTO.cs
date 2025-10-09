namespace FoodEcomerce.DTO
{
    public class ProductDTO
    {
        public Guid Id { get; set; }
        public string? ManagementCode { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal UnitPrice { get; set; } // đơn giá
        public int QuantityInStock { get; set; } // số lượng tồn
        public decimal TotalPrice { get; set; }
        public decimal SalePrice { get; set; }
        public int Inventory { get; set; }
        public int Discount { get; set; }
        public bool IsActive { get; set; }
        public string? Expiry { get; set; }  // hạn sử dụng
        public string? Preserve { get; set; }    // bảo quản
        public UnitCaculateDTO? UnitCaculate { get; set; }
        public TradeMarkDTO? TradeMark { get; set; }
        public PlaceOfProductDTO? PlaceProduct { get; set; }  
        public List<ImageProductDTO>? ImageProducts { get; set; }
        public List<ProductCategoryDTO>? ProductCategories { get; set; }
    }
}
