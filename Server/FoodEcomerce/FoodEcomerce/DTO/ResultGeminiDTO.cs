using FoodEcomerce.Entity.StoreProcedure;

namespace FoodEcomerce.DTO
{
    public class ResultGeminiDTO
    {
        public RecipeResponseDTO RecipeResponse { get; set;}

        public List<sp_WebFood_GetAllProduct>? Product { get; set;}   
    }
}
