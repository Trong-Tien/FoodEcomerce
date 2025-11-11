using FoodEcomerce.DTO;
using FoodEcomerce.Entity.StoreProcedure;
using FoodEcomerce.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileSystemGlobbing;
using Newtonsoft.Json;
using System.Text;
using System.Text.RegularExpressions;

namespace FoodEcomerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GeminiController : ControllerBase
    {
        private readonly GeminiAiServices _geminiAiServices;
      

        public GeminiController(GeminiAiServices geminiAiServices)
        {

            _geminiAiServices = geminiAiServices;
        }

        [HttpPost("GeminiAI")]
        public async Task<IActionResult> AskGeminiAsync( string prompt)
        {
         
            try
            {
                var result = await _geminiAiServices.GetDataFromAI(prompt);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        public static string FormatGeminiResponse(string rawText)
        {
            if (string.IsNullOrWhiteSpace(rawText))
                return string.Empty;
            string formatted = rawText;

            formatted = formatted.Replace("\\n", "\n");
            formatted = formatted.Replace("\\", string.Empty);
            formatted = Regex.Replace(formatted, @"\s+", " ").Trim();

            formatted = formatted.Replace("---", "\n----------------------------------------\n");


            return formatted;
        }
    }
}
