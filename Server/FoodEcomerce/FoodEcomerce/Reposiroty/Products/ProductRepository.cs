using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.Products
{
    public class ProductRepository : BaseRepository<Product, ProductModal, ProductDTO, Guid>, IProductRepository
    {
        private readonly FoodDbContex _context;
        public ProductRepository(FoodDbContex dbContext, IMapper mapper) : base(dbContext, mapper)
        {
            dbContext = _context;
        }

        public async Task<ResultModal> CreateWithQuery(ProductModal modal)
        {
            var data = _context.Products.FirstOrDefault(r=> r.Id == modal.Id);
            if (data != null) { 
               Product product = new Product();
               product.Id = modal.Id;
               product.Name = modal.Name;  
               product.Description = modal.Description;
                product.UnitPrice = modal.UnitPrice;    
                product.QuantityInStock = modal.QuantityInStock;    
                product.Discount = modal.Discount;  
                product.UnitCaculateId = modal.UnitCaculateId;
                var UnitCaculate = _context.UnitCaculates.FirstOrDefault(u => u.Id == modal.UnitCaculateId);    
                product.TotalPrice = UnitCaculate != null ? Math.Round(product.TotalPrice * (decimal)UnitCaculate.ConservationRate , 2) : 0;
                product.TradeMarkId = modal.TradeMarkId;    
                product.PlaceProductId = modal.PlaceProductId;
                product.IsDelete = false;
                product.Expiry = modal.Expiry;
                product.Preserve = modal.Preserve;

                _context.Products.Add(product); 


                // Thêm danh mục cho sản phẩm
                List<ProductCategory> categories = new List<ProductCategory>();
                if(modal.CategoryId != null)
                {
                    foreach (var c in modal.CategoryId)
                    {
                        ProductCategory itemCate = new ProductCategory();   
                        itemCate.ProductId = product.Id;
                        itemCate.CategoryId = c;
                        categories.Add(itemCate);   
                    }
                    _context.ProductCategorys.AddRange(categories);
                }    
              
                // thêm hình ảnh
                List<ImageProduct> imageProduct = new List<ImageProduct>();
                foreach (var item in modal.ImageUrl)
                {
                    if (item != null)
                    {
                        var ImageUrl = Helpper.Untils.UploadFileImage(item, "Banner");
                        ImageProduct dataImage = new ImageProduct();
                        dataImage.Id = Guid.NewGuid();
                        dataImage.ImageUrl = ImageUrl;
                        dataImage.ProductId = product.Id;    
                        imageProduct.Add(dataImage);
                    }
                }
                _context.ImageProducts.AddRange(imageProduct);  
                await _context.SaveChangesAsync();

                return new ResultModal () { Status = 200 , Message="Thêm sản phẩm thành công", Success = true };    
            }
            return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = true };
        }
    }
}
