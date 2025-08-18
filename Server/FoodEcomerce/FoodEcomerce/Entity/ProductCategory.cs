namespace FoodEcomerce.Entity
{
    public class ProductCategory
    {
        public Guid ProductId { get; set; }
        public Guid CategoryId { get; set; }

        public Category? Categories { get; set; }   
        public Product? Products { get; set; } 
    }
}
