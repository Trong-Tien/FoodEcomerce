namespace FoodEcomerce.Modal
{
    public class CategoryModal
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public IFormFile? ImageUrl { get; set; }
        public Guid CategoryParentId { get; set; }
    }
}
