namespace FoodEcomerce.Entity
{
    public class Product : BaseEntity
    {
        public Guid Id { get; set; }
        public string? ManagementCode { get; set; } 
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal? UnitPrice { get; set; } // đơn giá
        public int QuantityInStock { get; set; } // số lượng tồn
        public decimal TotalPrice { get; set ; }
        public decimal? SalePrice { get; set; }
        public int Inventory { get; set; }  // Hàn tồn kho
        public int Discount { get; set; } // giảm giá
        public bool IsActive { get; set; }
        public string? Expiry { get; set; }  // hạn sử dụng
        public string? Preserve {get; set; }    // bảo quản
        // foreign key
        public Guid UnitCaculateId { get; set; }
        public int TradeMarkId { get; set; }
        public int PlaceProductId { get; set; }
        //
        public TradeMark? TradeMark { get; set; }
        public UnitCaculate? UnitCaculate { get; set; }
        public PlaceProduct? PlaceProduct { get; set; }
        public virtual ICollection<ProductCategory> ProductCategories { get; set; } = new List<ProductCategory>();
        public ICollection<ImageProduct> ImageProducts { get; set; } = new List<ImageProduct>();
        public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
        public ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();   

    }
}
