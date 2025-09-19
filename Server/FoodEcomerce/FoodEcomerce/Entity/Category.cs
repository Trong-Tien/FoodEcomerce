namespace FoodEcomerce.Entity
{
    public class Category
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public Guid? CategoryParentId { get; set; }
        public Category? ParentCategory { get; set; } 
        public virtual ICollection<Category> ChildCategories { get; set;  } = new List<Category>();
        public virtual ICollection<ProductCategory> ProductCategories { get; set; } = new List<ProductCategory>();
    }
}
