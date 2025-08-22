namespace FoodEcomerce.DTO
{
    public class LoginDTO
    {
        public Guid Id { get; set; }
        public string? UserName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
        public Guid RoleId { get; set; }
        public string? AccessToken { get; set; } 
        public string? RefeshToken { get; set; } 
        public int Status { get; set; }
        public DateTime Expires { get; set; }
    }
}
