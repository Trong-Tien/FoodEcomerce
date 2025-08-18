namespace FoodEcomerce.Entity
{
    public class PaymentMenthod
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public ICollection<Orders>? Orders { get; set; } = new List<Orders>();

    }
}
