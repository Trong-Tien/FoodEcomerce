namespace FoodEcomerce.DTO
{
    public class ProductListDTO
    {
        public Guid Id { get; set; }
        public string? ManagementCode { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal? UnitPrice { get; set; }
        public string? TradeMarkName { get; set; }
        public string? PlaceProduct { get; set; }
        public string? Images { get; set; }
        public int QuantityInStock { get; set; }
        public decimal TotalPrice { get; set; }
        public int Inventory { get; set; }
        public int Discount { get; set; }
        public bool IsActive { get; set; }
        public Guid UnitCaculateId { get; set; }
        public byte[]? Image { get; set; }
        public int TradeMarkId { get; set; }
        public int PlaceProductId { get; set; }
        public string? Expiry { get; set; }  // hạn sử dụng
        public string? Preserve { get; set; }    // bảo quản
        public double? Rating { get; set; }
    }
}
