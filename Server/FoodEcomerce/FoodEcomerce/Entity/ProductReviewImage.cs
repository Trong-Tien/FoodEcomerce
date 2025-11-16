namespace FoodEcomerce.Entity
{
    public class ProductReviewImage
    {
        public Guid Id { get; set; }
        public Guid ReviewId { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public virtual ProductReview? ProductReview { get; set; }
    }
}
