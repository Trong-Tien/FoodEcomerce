namespace FoodEcomerce.DTO
{
    public class ProductReviewDTO
    {
        public int Id { get; set; }
        public Guid ProductId { get; set; }
        public Guid UserId { get; set; }
        public int Rating { get; set; }
        public string? Comment { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public List<ProductReviewImageDTO> productReviewImageDTOs { get; set; }
    }
}
