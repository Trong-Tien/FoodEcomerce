namespace FoodEcomerce.DTO
{
    public class VoucherUserDTO
    {
        public int Id { get; set; }
        public int VoucherId { get; set; }
        public Guid UserId { get; set; }
        public bool IsUsed { get; set; }
        public DateTime? UsedAt { get; set; }

        public VoucherDTO? VoucherDTO { get; set; }  
    }
}
