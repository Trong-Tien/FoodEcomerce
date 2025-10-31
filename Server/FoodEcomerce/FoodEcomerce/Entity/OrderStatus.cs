namespace FoodEcomerce.Entity
{
    public class OrderStatus
    {
        public int Id { get; set; }
        public string? StatusCode { get; set; }
        public string? StatusName { get; set; }
        public string? Description { get; set; }
        public int  SortOrder { get; set; }
        public  bool IsActive { get; set; }
        public ICollection<Orders> OrderDetails { get; set; } = new List<Orders>();
    }
}
