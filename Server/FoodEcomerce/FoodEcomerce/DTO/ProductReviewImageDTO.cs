namespace FoodEcomerce.DTO
{
    public class ProductReviewImageDTO
    {
        public int Id { get; set; }
        public int ProductReviewId { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
