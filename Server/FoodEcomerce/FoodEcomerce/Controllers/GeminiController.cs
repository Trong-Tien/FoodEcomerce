using FoodEcomerce.DTO;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;
using System.Text.RegularExpressions;

namespace FoodEcomerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GeminiController : ControllerBase
    {
        private readonly HttpClient _httpClient;


        public GeminiController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpPost("GeminiAI")]
        public async Task<IActionResult> AskGeminiAsync( string prompt)
        {
            var url = $"https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=AIzaSyBge15V7sjnKSQE_fjoU82xfVpI5ClvkuM";
            try
            {
                var requestBody = new
                {
                    contents = new[]
                    {
                    new
                    {
                        parts = new[]
                        {
                            new { text = prompt }
                        }
                    }
                }
                };

                var json = JsonConvert.SerializeObject(requestBody);
                var response = await _httpClient.PostAsync(
                    url,
                    new StringContent(json, Encoding.UTF8, "application/json")
                );

                if (!response.IsSuccessStatusCode)
                {
                    var err = await response.Content.ReadAsStringAsync();
                    return StatusCode((int)response.StatusCode, err);
                }

                var jsonResponse = await response.Content.ReadAsStringAsync();
                var result = JsonConvert.DeserializeObject<GeminiResponseDTO>(jsonResponse);

                string text  = result.Candidates[0].Content.Parts[0].Text;

                string test = FormatGeminiResponse(text);

                return Ok(test);
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
