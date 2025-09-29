namespace FoodEcomerce.Entity
{
    public class PlaceProduct
    {
        public int Id { get; set; } 
        public string? Name { get; set; }
        public string? Discription { get; set; }
        public DateTime? CreateAt { get; set; }
        public string? CreateUser { get; set; }
        public ICollection<Product> Products { get; set; } = new List<Product>();   
    }
}
