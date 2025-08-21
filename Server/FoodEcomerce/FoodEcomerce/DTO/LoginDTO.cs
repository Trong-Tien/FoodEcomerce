namespace FoodEcomerce.DTO
{
    public class LoginDTO
    {
        public Guid Id { get; set; }
        public string? UserName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
        public string? AccessToken { get; set; } = null;
        public string? RefeshToken { get; set; } = null;
    }
}
