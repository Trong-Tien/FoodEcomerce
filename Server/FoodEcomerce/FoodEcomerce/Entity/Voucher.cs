namespace FoodEcomerce.Entity
{
    public class Voucher
    {
        public int VoucherId { get; set; }
        public string Code { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string DiscountType { get; set; } = null!; 
        public decimal DiscountValue { get; set; } 
        public decimal MinOrderAmount { get; set; } 
        public decimal MaxDiscountAmount  { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndTime { get; set; }
        public int UsageLimit   { get; set; }
        public int UsedCount { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt   { get; set; }
        public virtual ICollection<VoucherUser> VoucherUsers { get; set; } = new List<VoucherUser>();
        public virtual ICollection<Orders> Orders { get; set; } = new List<Orders>();
    }
}
