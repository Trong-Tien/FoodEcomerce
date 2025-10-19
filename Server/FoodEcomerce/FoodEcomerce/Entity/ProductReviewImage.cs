namespace FoodEcomerce.Entity
{
    public class ProductReviewImage
    {
        public int Id { get; set; }
        public int ProductReviewId { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public virtual ProductReview? ProductReview { get; set; }
    }
}
