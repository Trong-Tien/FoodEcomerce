namespace FoodEcomerce.Modal
{
    public class ProductReviewModal
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public Guid UserId { get; set; }
        public int Rating { get; set; }
        public string? Comment { get; set; }
        public DateTime CreatedAt { get; set; } 
        public DateTime UpdatedAt { get; set; } 

        public List<IFormFile>? ImageUrls { get; set; }
    }
}
