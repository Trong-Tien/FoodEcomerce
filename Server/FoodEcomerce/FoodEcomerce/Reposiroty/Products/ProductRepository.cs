using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Entity.StoreProcedure;
using FoodEcomerce.Modal;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto;

namespace FoodEcomerce.Reposiroty.Products
{
    public class ProductRepository : BaseRepository<Product, ProductModal, ProductDTO, Guid>, IProductRepository
    {
        private readonly FoodDbContex _context;
        private readonly StoreDbcontext _storeContext;
        public ProductRepository(FoodDbContex dbContext, IMapper mapper, StoreDbcontext storeDbcontext) : base(dbContext, mapper)
        {
            _context = dbContext;
            _storeContext = storeDbcontext;
        }

        public async Task<ResultModal> CreateWithQuery(ProductModal modal)
        {
            var data = _context.Products.FirstOrDefault(r => r.Id == modal.Id);
            if (data == null)
            {
                Product product = new Product();
                product.Id = modal.Id;
                product.Name = modal.Name;
                product.ManagementCode = modal.ManagementCode;
                product.Description = modal.Description;
                product.UnitPrice = modal.UnitPrice;
                product.QuantityInStock = modal.QuantityInStock;
                product.Discount = modal.Discount;
                product.UnitCaculateId = modal.UnitCaculateId;
                var UnitCaculate = _context.UnitCaculates.FirstOrDefault(u => u.Id == modal.UnitCaculateId);
                product.TotalPrice = UnitCaculate != null ? Math.Round((decimal)(product.UnitPrice * product.QuantityInStock * (decimal)UnitCaculate.ConservationRate), 2) : 0;
                product.SalePrice = Math.Round(product.TotalPrice * product.Discount ,2);
                product.TradeMarkId = modal.TradeMarkId;
                product.PlaceProductId = modal.PlaceProductId;
                product.IsDelete = false;
                product.Expiry = modal.Expiry;
                product.Preserve = modal.Preserve;
                product.IsActive = modal.IsActive;
                product.Inventory = modal.Inventory;
                product.CreateAt = DateTime.Now;    
                _context.Products.Add(product);
                await _context.SaveChangesAsync();

                // Thêm danh mục cho sản phẩm
                List<ProductCategory> categories = new List<ProductCategory>();
                if (modal.CategoryId != null)
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
                        var ImageUrl = Helpper.Untils.UploadFileImage(item, "Products");
                        ImageProduct dataImage = new ImageProduct();
                        dataImage.Id = Guid.NewGuid();
                        dataImage.ImageUrl = ImageUrl;
                        dataImage.ProductId = product.Id;
                        imageProduct.Add(dataImage);
                    }
                }
                _context.ImageProducts.AddRange(imageProduct);
                await _context.SaveChangesAsync();

                return new ResultModal() { Status = 200, Message = "Thêm sản phẩm thành công", Success = true };
            }
            return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = true };
        }

        public async Task<List<sp_WebFood_GetAllProduct>> GetAll(int pageNumber, int pageSize, string ids , int orderType = 3 , string keyWord = "-1")
        {
            return await _storeContext.sp_WebFood_GetAllProduct.FromSql($"Execute sp_WebFood_GetAllProduct @pageNumber={pageNumber} , @pageSize={pageSize} , @categoryIds={ids} , @orderType={orderType} , @keyWord={keyWord}").ToListAsync();
        }

        public async Task<List<sp_WebFood_GetAllProductImage>> GetProductImage(Guid productId)
        {
            return await _storeContext.sp_WebFood_GetAllProductImage.FromSql($"Execute sp_WebFood_GetAllProductImage @productID={productId}").ToListAsync();
        }

        public async Task<ResultModal> UpdateWithQuery(ProductModal modal)
        {
            var productData = _context.Products.FirstOrDefault(r=> r.Id == modal.Id);
            if (productData != null) {
                 productData.Name = modal.Name;
                productData.ManagementCode = modal.ManagementCode;
                productData.Description = modal.Description;
                productData.UnitPrice = modal.UnitPrice;
                productData.QuantityInStock = modal.QuantityInStock;
                productData.Discount = modal.Discount;
                productData.UnitCaculateId = modal.UnitCaculateId;
                var UnitCaculate = _context.UnitCaculates.FirstOrDefault(u => u.Id == modal.UnitCaculateId);
                productData.TotalPrice = UnitCaculate != null ? Math.Round((decimal)(productData.UnitPrice * productData.QuantityInStock * (decimal)UnitCaculate.ConservationRate), 2) : 0;
                productData.SalePrice = Math.Round(productData.TotalPrice * productData.Discount, 2);
                productData.TradeMarkId = modal.TradeMarkId;
                productData.PlaceProductId = modal.PlaceProductId;
                productData.IsDelete = false;
                productData.Expiry = modal.Expiry;
                productData.Preserve = modal.Preserve;
                productData.Inventory = modal.Inventory;
                productData.UpdateAt = DateTime.Now;

                var productCategoryData = _context.ProductCategorys.Where(r=> r.ProductId ==productData.Id).ToList();
                if(productCategoryData.Count > 0)
                {
                    _context.ProductCategorys.RemoveRange(productCategoryData);
                    await _context.SaveChangesAsync();
                }    

                List<ProductCategory> categories = new List<ProductCategory>();
                if (modal.CategoryId != null)
                {
                    foreach (var c in modal.CategoryId)
                    {
                        ProductCategory itemCate = new ProductCategory();
                        itemCate.ProductId = productData.Id;
                        itemCate.CategoryId = c;
                        categories.Add(itemCate);
                    }
                    _context.ProductCategorys.AddRange(categories);
                }

                 var listDataProductImage  = _context.ImageProducts.Where(r => r.ProductId == productData.Id).ToList(); 
                foreach(var data in listDataProductImage)
                {
                   if (!string.IsNullOrEmpty(data.ImageUrl)) 
                    {
                        Helpper.Untils.DeleteFile(data.ImageUrl);
                    }
                }    

                if(listDataProductImage.Count > 0)
                {
                    _context.ImageProducts.RemoveRange(listDataProductImage);   
                    await _context.SaveChangesAsync();
                }  
                    


                List<ImageProduct> imageProduct = new List<ImageProduct>();
                foreach (var item in modal.ImageUrl)
                {
                    if (item != null)
                    {
                        var ImageUrl = Helpper.Untils.UploadFileImage(item, "Products");
                        ImageProduct dataImage = new ImageProduct();
                        dataImage.Id = Guid.NewGuid();
                        dataImage.ImageUrl = ImageUrl;
                        dataImage.ProductId = productData.Id;
                        imageProduct.Add(dataImage);
                    }
                }
                _context.ImageProducts.AddRange(imageProduct);
                _context.Products.Update(productData);

                await _context.SaveChangesAsync();
                return new ResultModal() {Status = 200 ,Message="Chỉnh sửa thành công" , Success=true}; 
            }
            return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
        }
        public async Task<ResultModal> DeleteWithQuery(Guid productId)
        {
            var productData = _context.Products.FirstOrDefault(r => r.Id == productId);
            if (productData != null)
            {
                productData.IsDelete = true;
                var productImage = _context.ImageProducts.Where(r => r.ProductId == productId).ToList();

                if (productImage.Any())
                {
                    foreach (var item in productImage)
                    {
                        if (!string.IsNullOrEmpty(item.ImageUrl)) 
                        {
                            Helpper.Untils.DeleteFile(item.ImageUrl);
                        }
                    }

                    _context.ImageProducts.RemoveRange(productImage);
                }
                _context.Products.Update(productData);
                await _context.SaveChangesAsync();
               

                return new ResultModal()
                {
                    Status = 200,
                    Message = "Xóa dữ liệu thành công",
                    Success = true
                };
            }
            return new ResultModal()
            {
                Status = 202,
                Message = "Không tìm thấy dữ liệu để xoá",
                Success = false
            };


        }

        public async Task<List<sp_WebFood_GetAllProductCategory>> GetProductCategory(Guid productId)
        {
            return await _storeContext.sp_WebFood_GetAllProductCategory.FromSql($"Execute sp_WebFood_GetAllProductCategory @productID={productId}").ToListAsync();
        }

    }
}
