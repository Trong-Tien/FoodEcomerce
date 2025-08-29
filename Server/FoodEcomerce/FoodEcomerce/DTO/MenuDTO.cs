namespace FoodEcomerce.DTO
{
    public class MenuDTO
    {
        public Guid Id { get; set; }
        public int OrderNumber { get; set; }
        public string? Name { get; set; }
        public string? Icon { get; set; }
        public string? Url { get; set; }
        public bool IsActive { get; set; }
        public Guid? ParentId { get; set; }
    }
}
