namespace FoodEcomerce.Entity
{
    public class Cart
    {
        public Guid Id { get; set; }
        public  Guid UserId { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.Now;
        public DateTime UpdateAt { get; set; } = DateTime.Now; 
        public User? User { get; set; }  
        public ICollection<CartItem>? CartItems { get; set; } = new List<CartItem>();

    }
}
