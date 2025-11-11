using FoodEcomerce.Entity.StoreProcedure;

namespace FoodEcomerce.DTO
{
    public class ResultGeminiDTO
    {
        public RecipeResponseDTO geminiResponseDTO { get; set;}

        public List<sp_WebFood_GetAllProduct>? productDTO { get; set;}   
    }
}
