namespace FoodEcomerce.Modal
{
    public class MenuModal
    {
        public Guid Id { get; set; }
        public int OrderNumber { get; set; }
        public string? Name { get; set; }
        public string? Icon { get; set; }
        public string? Url { get; set; }
        public bool IsActive { get; set; } =  true;
        public Guid? ParentId { get; set; }
        public bool IsDelete { get; set; }
        public DateTime? CreateAt { get; set; } = DateTime.UtcNow;
        public string? CreateUser { get; set; }
    }
}
