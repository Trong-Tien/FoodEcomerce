namespace FoodEcomerce.Modal
{
    public class RegisterModal
    {
        public Guid Id { get; set; } = Guid.NewGuid();  
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? PhoneNumber { get; set; }
        public bool? Acvite { get; set; } = true;   
        public bool? IsAdmin { get; set; } = false;
        public int? StatusId { get; set; } = 6;
        public DateTime? CreateAt { get; set; } =  DateTime.Now;
        public DateTime? UpdateAt { get; set; } = null;
        public DateTime? DeleteAt { get; set; }  = null ;
        public Guid RoleId { get; set; } 
        public string? CreateUser { get; set; } = null;
        public string? UpdateUser { get; set; } = null;
        public bool IsDelete { get; set; } = false;
    }
}
