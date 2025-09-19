namespace FoodEcomerce.Entity
{
    public class OTP
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Code { get; set; }
        public DateTime Expiry { get; set; }
    }
}
