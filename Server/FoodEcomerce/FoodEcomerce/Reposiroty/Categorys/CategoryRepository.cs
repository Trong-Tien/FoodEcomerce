using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Helpper;
using FoodEcomerce.Modal;
using Microsoft.EntityFrameworkCore;

namespace FoodEcomerce.Reposiroty.Categorys
{
    public class CategoryRepository : BaseRepository<Category, CategoryModal, CategoryDTO, Guid>, ICategoryDepository
    {
        private readonly FoodDbContex _foodDbContex;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;   
        public CategoryRepository(FoodDbContex dbContext, IMapper mapper , IWebHostEnvironment webHostEnvironment) : base(dbContext, mapper)
        {
            _foodDbContex = dbContext;
            _mapper = mapper;   
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<List<CategoryDTO>> GetAllByChild()
        {
            var result = _mapper.Map<List<CategoryDTO>>(await _foodDbContex.Categories.Where(r => r.CategoryParentId != null).ToListAsync());
            foreach (var item in result)
            {
                if (string.IsNullOrEmpty(item.ImageUrl))
                { continue; }
                else
                {
                    string extension;
                    extension = Path.GetExtension(item.ImageUrl);
                    var filePath = Path.Combine(_webHostEnvironment.WebRootPath, item.ImageUrl);
                    if (System.IO.File.Exists(filePath))
                    {
                        // Read the file content
                        byte[] fileBytes = System.IO.File.ReadAllBytes(filePath);

                        // Set the content type and file name for the response
                        var contentType = Untils.GetmimeType(extension);
                        if (extension == ".png" || extension == ".jpg" || extension == ".jpeg")
                        {
                            item.Image = fileBytes;
                        }
                    }
                }
            }
            return result;
        }

        public async Task<List<CategoryDTO>> GetAllParent()
        {
            var result = _mapper.Map<List<CategoryDTO>>(await _foodDbContex.Categories.Where(r => r.CategoryParentId == null).ToListAsync());
            foreach (var item in result) {
                if (string.IsNullOrEmpty(item.ImageUrl))
                { continue; }
                else
                {
                    string extension;
                    extension = Path.GetExtension(item.ImageUrl);
                    var filePath = Path.Combine(_webHostEnvironment.WebRootPath, item.ImageUrl);
                    if (System.IO.File.Exists(filePath))
                    {
                        // Read the file content
                        byte[] fileBytes = System.IO.File.ReadAllBytes(filePath);

                        // Set the content type and file name for the response
                        var contentType = Untils.GetmimeType(extension);
                        if (extension == ".png" || extension == ".jpg" || extension == ".jpeg")
                        {
                            item.Image = fileBytes;
                        }
                    }
                }
            }
            return result;
        }
    }
}
