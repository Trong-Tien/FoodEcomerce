using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Entity.StoreProcedure;
using FoodEcomerce.Helpper;
using Microsoft.EntityFrameworkCore;
using Microsoft.ML;
using Microsoft.ML.Data;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;

namespace FoodEcomerce.Services
{
    public class GeminiAiServices
    {
        private readonly HttpClient _httpClient;
        private readonly StoreDbcontext _storeDbcontext;
        private readonly FoodDbContex _foodDbContex;
        public GeminiAiServices(HttpClient httpClient , StoreDbcontext storeDbcontext , FoodDbContex foodDbContex)
        {
            _httpClient = httpClient;
            _storeDbcontext = storeDbcontext;
            _foodDbContex = foodDbContex;
        }
        public async Task<ResultGeminiDTO> GetDataFromAI(string prompt)
        {
            ResultGeminiDTO result = new ResultGeminiDTO();
            var url = $"https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key={APIKeys.GemniApiKey}";
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

                var mlContext = new MLContext();
                var products = await _foodDbContex.Products
                             .Include(p => p.ImageProducts)
                             .Select(p => new ProductDataDTO
                             {
                                 ProductId = p.Id.ToString(),
                                 ProductText = p.Name + " " + p.Description,
                                 UnitPrice = p.UnitPrice.ToString(),
                                 Image = p.ImageProducts
                                              .Select(ip => ip.ImageUrl)
                                              .FirstOrDefault()
                             })
                             .ToListAsync();


                var productDataView = mlContext.Data.LoadFromEnumerable(products);

                var pipeline = mlContext.Transforms.Text.FeaturizeText(outputColumnName: "Features",inputColumnName: nameof(ProductDataDTO.ProductText));

                var model = pipeline.Fit(productDataView);
                var transformedData = model.Transform(productDataView);
                var featureColumn = transformedData.GetColumn<float[]>("Features").ToArray();

                var ingredientText = string.Join(" ", result.RecipeResponse.Ingredients);
                var tempData = new List<ProductDataDTO> { new ProductDataDTO { ProductText = ingredientText } };
                var tempDataView = mlContext.Data.LoadFromEnumerable(tempData);
                var transformedIngredient = model.Transform(tempDataView);
                var ingredientVector = transformedIngredient.GetColumn<float[]>("Features").First();

                float CosineSimilarity(float[] vectorA, float[] vectorB)
                {
                    float dot = 0, magA = 0, magB = 0;
                    for (int i = 0; i < vectorA.Length; i++)
                    {
                        dot += vectorA[i] * vectorB[i];
                        magA += vectorA[i] * vectorA[i];
                        magB += vectorB[i] * vectorB[i];
                    }
                    return dot / (float)(Math.Sqrt(magA) * Math.Sqrt(magB));
                }

                var scoredProducts = products
                    .Select((p, idx) => new
                    {
                        Product = p,
                        Score = CosineSimilarity(ingredientVector, featureColumn[idx])
                    })
                    .OrderByDescending(x => x.Score)
                    .Take(3).Select(x => x.Product).ToList();

                result.Product = scoredProducts;



                return result;  

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
