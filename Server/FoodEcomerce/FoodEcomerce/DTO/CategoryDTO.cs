namespace FoodEcomerce.DTO
{
    public class CategoryDTO
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public Guid CategoryParentId { get; set; }
    }
}
