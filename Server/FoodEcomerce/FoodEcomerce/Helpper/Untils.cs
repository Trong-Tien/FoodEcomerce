using Microsoft.IdentityModel.Tokens;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using static System.Net.Mime.MediaTypeNames;
namespace FoodEcomerce.Helpper
{
    public static class Untils
    {
        private static string[] _permittedExtensions = { ".txt", ".zip", ".docx", ".doc", ".mp4", ".pdf", "mp3", ".wav" };

        private static long _fileSizeLimit = 2097152000;

        public static string UploadFileImage(IFormFile file ,string Folder )
        {
            try
            {
                string folder = $"UploadFiles/Images/{Folder}/";
                // full path to file in temp location
                var filePath = Path.Combine(
                    Directory.GetCurrentDirectory(), "wwwroot",
                    folder);

                bool folderExists = Directory.Exists(filePath);
                if (!folderExists)
                    Directory.CreateDirectory(filePath);

                var url = "";

                var id = Guid.NewGuid();
                var fullpath = filePath + $"{id}_{file.FileName.Replace(" ", "")}";
                using (var image = SixLabors.ImageSharp.Image.Load(file.OpenReadStream()))
                {
                    int width = image.Width;
                    if (image.Width > 800)
                    {
                        width = 800;
                    }
                    image.Mutate(x => x
                         .Resize(width, 0)
                     );

                    image.Save(fullpath);
                    url = url + folder + $"{id}_{file.FileName.Replace(" ", "")}";
                }
                return url;
            }
            catch (Exception exp)
            {
                string message = $"file / upload failed! + {exp.Message}";
                return "";
            }
        }
        public static string GetmimeType(string extension)
        {
            string mimeType = string.Empty;
            switch (extension)
            {
                case ".png":
                    mimeType = "image/png";
                    break;
                case ".jpg":
                    mimeType = "image/jpg";
                    break;
                case ".jfif":
                    mimeType = "image/jfif";
                    break;
                case ".jpeg":
                    mimeType = "image/jpeg";
                    break;
                case ".pdf":
                    mimeType = "application/pdf";
                    break;
                case ".mp3":
                    mimeType = "audio/mpeg";
                    break;
                case ".wav":
                    mimeType = "audio/wav";
                    break;
                default:
                    // no support
                    break;
            }
            return mimeType;
        }

        public static bool DeleteFile(string fileName)
        {
            try
            {
                if (!string.IsNullOrEmpty(fileName))
                {
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", fileName);

                    if (System.IO.File.Exists(filePath))
                        System.IO.File.Delete(filePath);
                    return true;
                }
                return false;
            }
            catch (Exception exp)
            {
                string message = $"file / upload failed! + {exp.Message}";
                return false;
            }

        }
        public static string EncrypePassword(string password, string salt = null) {
            if (string.IsNullOrEmpty(password))
            {
                return string.Empty;
            }
            string combinedString = password + salt;

            using (SHA256 sha256Hash = SHA256.Create())
            {
                // Convert the input string to a byte array
                byte[] bytes = Encoding.UTF8.GetBytes(combinedString);

                // Compute the hash
                byte[] hashBytes = sha256Hash.ComputeHash(bytes);

                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < hashBytes.Length; i++)
                {
                    builder.Append(hashBytes[i].ToString("x2")); 
                }
                return builder.ToString();
            }
        }
        public static bool VerifyPassword(string enteredPassword, string storedHash)
        {
            string hashedEnteredPassword = EncrypePassword(enteredPassword);
            return hashedEnteredPassword.Equals(storedHash, StringComparison.OrdinalIgnoreCase);
        }

        public static string GenerateAccessToken(string userId , string username , Guid role)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(AppSettingsProvider.Get("JWT:IssuerSigningKey") ?? "");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
               {
                        new Claim("UserId",userId.ToString()),
                        new Claim("UserName", username.ToString()),
                        new Claim("Role", role.ToString()),
               }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials
                   (new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);

            return jwtToken;
        }
        public static string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
            }
            return Convert.ToBase64String(randomNumber);
        }
    }
}
