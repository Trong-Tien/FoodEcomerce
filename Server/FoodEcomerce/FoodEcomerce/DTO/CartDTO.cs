namespace FoodEcomerce.DTO
{
    public class CartDTO
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.Now;
        public DateTime UpdateAt { get; set; } = DateTime.Now;
        public List<CartItemDTO> CartItems { get; set; } = new List<CartItemDTO>();
    }
}
