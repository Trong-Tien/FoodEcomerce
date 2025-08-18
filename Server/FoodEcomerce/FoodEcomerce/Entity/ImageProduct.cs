namespace FoodEcomerce.Entity
{
    public class ImageProduct
    {
        public Guid Id { get; set; }
        public string? ImageUrl { get; set; }
        public Guid ProductId { get; set; }
        public Product? Product { get; set; } 
    }
}
