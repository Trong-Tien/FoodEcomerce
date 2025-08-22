namespace FoodEcomerce.Entity
{
    public class User : BaseEntity
    {
        public Guid Id { get; set; }    
        public string? UserName { get; set; }
        public string? Password { get; set; } 
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; } 
        public bool? Acvite { get; set; }
        public bool? IsAdmin { get; set; }
        public int? StatusId { get; set; }   
        public Guid RoleId { get; set; }
        public Role? Role { get; set; }
        public Status? Status { get; set; }
        public Cart? Cart { get; set; } 
        public ICollection<Orders>? Orders { get; set; } = new List<Orders>();
    }
}
