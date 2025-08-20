using System.ComponentModel.DataAnnotations.Schema;

namespace FoodEcomerce.Modal
{
    public class PannerModal
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public IFormFile? ImageUrl { get; set; }
        public bool? Active { get; set; }
    }
}
