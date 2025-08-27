using FoodEcomerce.Helpper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodEcomerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        public FileController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet("image")]
        public IActionResult GetImage(string path)
        {
            if (string.IsNullOrEmpty(path))
                return Ok(new { Messages = "Vui lòng nhập đường dẫn file." });

            string extension;
            extension = Path.GetExtension(path);
            var filePath = Path.Combine(_webHostEnvironment.WebRootPath, path);

            if (System.IO.File.Exists(filePath))
            {
                // Read the file content
                byte[] fileBytes = System.IO.File.ReadAllBytes(filePath);

                // Set the content type and file name for the response
                var contentType = Untils.GetmimeType(extension);
                if (extension == ".png" || extension == ".jpg" || extension == ".jpeg")
                {
                    return File(fileBytes, contentType);
                }
            }

            return Ok(null);
        }

    }
}
