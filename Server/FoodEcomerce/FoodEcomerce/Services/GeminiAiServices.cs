using FoodEcomerce.DTO;
using FoodEcomerce.Entity.StoreProcedure;
using FoodEcomerce.Helpper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;

namespace FoodEcomerce.Services
{
    public class GeminiAiServices
    {
        private readonly HttpClient _httpClient;
        private readonly StoreDbcontext _storeDbcontext;
        public GeminiAiServices(HttpClient httpClient , StoreDbcontext storeDbcontext)
        {
            _httpClient = httpClient;
            _storeDbcontext = storeDbcontext;
        }
        public async Task<ResultGeminiDTO> GetDataFromAI(string prompt)
        {
            ResultGeminiDTO result = new ResultGeminiDTO();
            var url = $"https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key={APIKeys.GemniApiKey}";
            var geminiPrompt = $@"
                                    Bạn là trợ lý nấu ăn.
                                    Hãy trả về công thức nấu ăn phù hợp với yêu cầu sau: {prompt}.

                                    Trả về kết quả DUY NHẤT dưới dạng JSON hợp lệ, KHÔNG bao gồm ký tự ``` hay markdown nào.
                                    Cấu trúc JSON mong muốn như sau:

                                    {{
                                      ""recipe"": ""<Nội dung mô tả cách nấu chi tiết, khoảng 3-5 câu>"",
                                      ""ingredients"": [""<Tên nguyên liệu 1>"", ""<Tên nguyên liệu 2>"", ""<Tên nguyên liệu 3>"", ...]
                                    }}

                                    Ví dụ đầu ra hợp lệ:
                                    {{
                                      ""recipe"": ""Để làm cá hồi nướng bơ tỏi, bạn ướp cá hồi với muối, tiêu và bơ, sau đó nướng ở 200°C trong 15 phút."",
                                      ""ingredients"": [""Cá hồi"", ""Bơ"", ""Tỏi"", ""Muối"", ""Tiêu""]
                                    }}
                                    ";
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
                            new { text = geminiPrompt }
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
                    throw new Exception(err);
                }

                var jsonResponse = await response.Content.ReadAsStringAsync();
                var dataResponse = JsonConvert.DeserializeObject<GeminiResponseDTO>(jsonResponse);

                string text = dataResponse.Candidates[0].Content.Parts[0].Text;
                text = text.Replace("```json", "").Replace("```", "").Trim();
       
                result.RecipeResponse = JsonConvert.DeserializeObject<RecipeResponseDTO>(text);

                string testIngredient = string.Join(",", result.RecipeResponse.Ingredients);

                // lấy danh sách sản phẩm được để xuất từ AI
                result.Product = await _storeDbcontext.sp_WebFood_GetAllProduct.FromSqlInterpolated($"Execute sp_WebFood_GetAllProduct_ByGemini @Ingredients={testIngredient}").ToListAsync();


                return result;  

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
