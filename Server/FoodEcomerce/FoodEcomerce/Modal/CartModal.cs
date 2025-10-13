namespace FoodEcomerce.Modal
{
    public class CartModal
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.Now;
        public DateTime UpdateAt { get; set; } = DateTime.Now;
    }
}
