namespace FoodEcomerce.DTO
{
    public class ProductReviewImageDTO
    {
        public Guid Id { get; set; }
        public Guid ProductReviewId { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
