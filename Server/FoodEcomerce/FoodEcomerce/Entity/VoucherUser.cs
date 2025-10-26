namespace FoodEcomerce.Entity
{
    public class VoucherUser
    {
        public int Id { get; set; }
        public int VoucherId { get; set; }
        public Guid UserId { get; set; }
        public bool IsUsed { get; set; }
        public DateTime? UsedAt { get; set; }
        public virtual User User { get; set; } = null!;
        public virtual Voucher Voucher { get; set; } = null!;
    }
}
