using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodEcomerce.Entity.StoreProcedure
{
    public class sp_WebFood_GetAllProductCategory
    {
        [Key]
        [Column("Id")]
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}
