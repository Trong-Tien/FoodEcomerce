namespace FoodEcomerce.Entity
{
    public class BaseEntity
    {
        public DateTime? CreateAt { get; set; }
        public DateTime? UpdateAt { get; set; }
        public DateTime? DeleteAt { get; set; }
        public string? CreateUser { get; set; }
        public string? UpdateUser { get; set; }
        public bool IsDelete { get; set; }
    }
}
