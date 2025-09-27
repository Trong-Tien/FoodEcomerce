using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodEcomerce.Entity.StoreProcedure
{
    public class sp_WebFood_GetAllProduct
    {
        [Key]
        [Column("Id")]
        public Guid Id { get; set; }
        public string? ManagementCode { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? UnitPrice { get; set; }
        public string? TradeMarkName { get; set; }
        public string? PlaceProduct { get; set; }
    }
}
