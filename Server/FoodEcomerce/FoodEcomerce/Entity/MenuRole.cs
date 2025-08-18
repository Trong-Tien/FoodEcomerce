namespace FoodEcomerce.Entity
{
    public class MenuRole
    {
        public Guid MenuId { get; set; }
        public Guid RoleId { get; set; }
        public bool? Add { get; set; }  
        public bool? Watch { get; set; }
        public bool? Delete { get; set; }
        public bool? Update { get; set; }
        public  Menu? Menu { get; set; } 
        public  Role? Role { get; set; }
    }
}
