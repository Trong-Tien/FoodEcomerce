namespace FoodEcomerce.Entity
{
    public class Status
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public virtual ICollection<User> Users { get; set; }   = new List<User>();  
    }
}
