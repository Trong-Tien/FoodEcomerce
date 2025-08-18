namespace FoodEcomerce.Entity
{
    public class TradeMark
    {
        public int Id {  get; set; }
        public string? Name { get; set; }
        public string? ImageUrl { get; set; }
        public string?  Discription { get; set; }
        public bool? IsDelete { get; set; }
        public DateTime? CreateAt { get; set; }
        public string? CreateUser { get; set; }
        public ICollection<Product> Products { get; set; }  = new List<Product>();
    }
}
