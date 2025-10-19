namespace FoodEcomerce.Modal
{
    public class VoucherUserModal
    {
        public int Id { get; set; }
        public int VoucherId { get; set; }
        public Guid UserId { get; set; }
        public bool IsUsed { get; set; }
        public DateTime? UsedAt { get; set; }
    }
}
