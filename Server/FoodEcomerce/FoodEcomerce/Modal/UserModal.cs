namespace FoodEcomerce.Modal
{
    public class UserModal
    {
        public Guid Id { get; set; }
        public string? UserName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Address { get; set; }
        public bool Acvite { get; set; }
        public bool? IsAdmin { get; set; }
        public int? StatusId { get; set; }
        public Guid? RoleId { get; set; }
    }
}
