namespace FoodEcomerce.Modal
{
    public class ProductReviewModal
    {
        public int Id { get; set; }
        public Guid ProductId { get; set; }
        public Guid UserId { get; set; }
        public int Rating { get; set; }
        public string? Comment { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public List<ProductReviewImageModal>? productReviewImageModals { get; set; } 
    }
}
