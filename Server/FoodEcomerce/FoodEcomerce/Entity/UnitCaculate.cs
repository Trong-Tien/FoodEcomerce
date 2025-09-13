namespace FoodEcomerce.Entity
{
    public class UnitCaculate
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Code { get; set; }
        public string? Description { get; set; }
        public double ConservationRate { get; set; }
        public bool IsBaseUnit { get; set; }
        public Guid? BaseUnitId { get; set; }
        public UnitCaculate? ParentUnitCaculate { get; set; }
        public ICollection<UnitCaculate>? SubUnitCaculates { get; set; } = new List<UnitCaculate>();
        public ICollection<Product>? Products { get; set; } = new List<Product>();
        public ICollection<CartItem>? CartItems { get; set; } = new List<CartItem>();
        public ICollection<OrderDetail>? OrderDetails { get; set; } = new List<OrderDetail>();
    }
}
