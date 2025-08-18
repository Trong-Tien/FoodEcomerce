namespace FoodEcomerce.Entity
{
    public class Role : BaseEntity
    {
        public Guid Id { get; set; }    
        public int OrderNumber { get; set; }
        public string? Name { get; set; }
        public string? Discription { get; set; }
        public virtual ICollection<User> Users { get; set; } = new List<User>();      
        public virtual ICollection<MenuRole> MenuRoles { get; set; } = new List<MenuRole>();        
    }
}
