namespace FoodEcomerce.Entity
{
    public class StatusOrders
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public ICollection<Orders>? Orders { get; set; } = new List<Orders>();
    }
}
