using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Entity.StoreProcedure;
using FoodEcomerce.Modal;
using Microsoft.EntityFrameworkCore;

namespace FoodEcomerce.Reposiroty.ProductReviews
{
    public class ProductReviewRepository : BaseRepository<ProductReview, ProductReviewModal, ProductReviewDTO, Guid>, IProductReviewRepository
    {
        private FoodDbContex _foodDbContex;
        private StoreDbcontext _StoreDbcontext;
        private IMapper _mapper;
        public ProductReviewRepository(FoodDbContex dbContext, IMapper mapper, StoreDbcontext StoreDbcontext) : base(dbContext, mapper)
        {
            _foodDbContex = dbContext;
            _mapper = mapper;
            _StoreDbcontext = StoreDbcontext;
        }

        public async Task<ResultModal> CreateWithQuery(ProductReviewModal modal)
        {
            var data = _foodDbContex.ProductReviews.FirstOrDefault(r=> r.ProductId == modal.ProductId && r.UserId == modal.UserId);
            if (data == null)
            {
                ProductReview result = _mapper.Map<ProductReview>(modal);
                result.Id = Guid.NewGuid();
                result.CreatedAt = DateTime.Now;
                result.UpdatedAt = DateTime.Now;    
                _foodDbContex.ProductReviews.Add(result);
                await _foodDbContex.SaveChangesAsync();
                if (modal.ImageUrls != null)
                {
                
                    foreach (var item in modal.ImageUrls)
                    {
                        ProductReviewImage reviewImage = new();
                        string imageUrl = Helpper.Untils.UploadFileImage(item, "Comment");
                        reviewImage.ImageUrl = imageUrl;
                        reviewImage.Id = Guid.NewGuid();
                        reviewImage.ReviewId = result.Id; 
                        _foodDbContex.ProductReviewImages.Add(reviewImage);
                    }
                    await _foodDbContex.SaveChangesAsync();
                }
              
                return new ResultModal() { Status = 200, Message = "Chúc mừng bạn đã thêm bình luận thành công", Success = true };
            }
            else return new ResultModal() { Status = 202, Message = "Bạn đã đánh giá cho sản phẩm này", Success = false };

        }

        public async Task<ResultModal> DeleteWithQuery(Guid id)
        {
            var db = _foodDbContex.ProductReviews.FirstOrDefault(r=> r.Id == id);   
            if(db != null)
            {
                var productReviewImage = _foodDbContex.ProductReviewImages.Where(r=> r.ReviewId == id).ToList();
                if (productReviewImage != null) {
                    foreach (var item in productReviewImage) {
                        Helpper.Untils.DeleteFile(item.ImageUrl);   
                    }
                     _foodDbContex.RemoveRange(productReviewImage); 
                }
                _foodDbContex.Remove(db);
                await _foodDbContex.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Chúc mừng bạn đã xóa bình luận thành công", Success = true };
            }
            else return new ResultModal() { Status = 202, Message = "Lỗi", Success = false };
        }

        public async Task<List<ProductReviewDTO>> GetReviewByProductId(Guid id)
        {
            var testData = await _StoreDbcontext.sp_WebFood_getFoodReview.FromSql($"Execute sp_WebFood_getFoodReview @productId={id}").ToListAsync();
            return _mapper.Map<List<ProductReviewDTO>>(await _StoreDbcontext.sp_WebFood_getFoodReview.FromSql($"Execute sp_WebFood_getFoodReview @productId={id}").ToListAsync());
        }
    }
}
