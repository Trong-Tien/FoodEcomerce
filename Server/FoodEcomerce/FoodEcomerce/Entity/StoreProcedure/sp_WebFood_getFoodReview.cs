using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodEcomerce.Entity.StoreProcedure
{
    public class sp_WebFood_getFoodReview
    {
        [Key]
        [Column("Id")]   
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public Guid UserId { get; set; }
        public string? UserName { get; set; }
        public byte Rating { get; set; }
        public string? Comment { get; set; }
        public string? ImageUrl { get; set; }
    }
}
