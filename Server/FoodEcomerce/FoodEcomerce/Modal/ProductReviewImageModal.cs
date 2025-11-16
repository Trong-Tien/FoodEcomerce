namespace FoodEcomerce.Modal
{
    public class ProductReviewImageModal
    {
        public int Id { get; set; }
        public int ProductReviewId { get; set; }
        public IFormFile? ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    }
}
