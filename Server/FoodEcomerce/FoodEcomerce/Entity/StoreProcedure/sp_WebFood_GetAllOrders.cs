using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodEcomerce.Entity.StoreProcedure
{
    public class sp_WebFood_GetAllOrders
    {
        [Key]
        [Column("Id")]
        public Guid Id  { get; set; }
        public string? OrderCode { get; set; }
        public string? PhoneNumber { get; set; }
        public Guid UserId { get; set; }
        public string? UserName { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalPrice { get; set; }
        public string? ShippingAddress { get; set; }
        public int StatusId { get; set; }
        public int PaymentMenthodId { get; set; }
        public string? Note { get; set; }
        public decimal? ShippingFee { get; set; }
        public string? OrderDetails { get; set; }
    }
}
