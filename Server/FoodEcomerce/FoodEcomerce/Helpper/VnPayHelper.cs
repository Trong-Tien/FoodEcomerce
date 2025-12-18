using System.Net;
using System.Security.Cryptography;
using System.Text;

namespace FoodEcomerce.Helpper
{
    public class VnPayHelper
    {
        private readonly SortedDictionary<string, string> _requestData =
            new SortedDictionary<string, string>();

        public void Add(string key, string value)
        {
            if (!string.IsNullOrEmpty(value))
            {
                _requestData[key] = value;
            }
        }

        public string CreatePaymentUrl(string baseUrl, string hashSecret)
        {
            // 1️⃣ Build raw data để hash (KHÔNG encode)
            var rawData = string.Join("&",
                _requestData.Select(x => $"{x.Key}={x.Value}")
            );

            // 2️⃣ Hash
            var secureHash = HmacSHA512(hashSecret, rawData);

            // 3️⃣ Build query string (CÓ encode)
            var query = string.Join("&",
                _requestData.Select(x =>
                    $"{x.Key}={WebUtility.UrlEncode(x.Value)}")
            );

            // 4️⃣ Ghép URL
            return $"{baseUrl}?{query}&vnp_SecureHash={secureHash}";
        }

        private static string HmacSHA512(string key, string data)
        {
            var hmac = new HMACSHA512(Encoding.UTF8.GetBytes(key));
            var hashBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(data));
            return BitConverter.ToString(hashBytes)
                .Replace("-", "")
                .ToLower();
        }
    }

}
