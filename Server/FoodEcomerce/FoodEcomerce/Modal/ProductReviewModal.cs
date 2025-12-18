namespace FoodEcomerce.Modal
{
    public class ProductReviewModal
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public Guid UserId { get; set; }
        public string? UserName { get; set; }
        public int Rating { get; set; }
        public string? Comment { get; set; }

        public List<IFormFile>? ImageUrls { get; set; }


    }
}
