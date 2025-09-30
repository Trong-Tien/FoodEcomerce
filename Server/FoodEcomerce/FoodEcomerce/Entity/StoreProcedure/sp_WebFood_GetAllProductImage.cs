using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodEcomerce.Entity.StoreProcedure
{
    public class sp_WebFood_GetAllProductImage
    {
        [Key]
        [Column("Id")]
        public Guid Id { get; set; }    
        public string ImageUrl { get; set; }
        public Guid ProductId { get; set; }
    }
}
