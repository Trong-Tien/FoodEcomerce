using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodEcomerce.Entity.StoreProcedure
{
    public class sp_WebFood_GetMenuByRole
    {
        [Key]
        [Column("MenuId")]
        public Guid MenuId { get; set; }
        public Guid RoleId { get; set; }
        public int OrderNumber { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public string Url { get; set; }
        public bool Watch { get; set; }
        public bool Add { get; set; }
        public bool Delete { get; set; }
        public bool Update { get; set; }
    }
}
