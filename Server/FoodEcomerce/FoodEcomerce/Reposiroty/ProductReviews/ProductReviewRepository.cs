using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.ProductReviews
{
    public class ProductReviewRepository : BaseRepository<ProductReview, ProductReviewModal, ProductReviewDTO, Guid>, IProductReviewRepository
    {
        private FoodDbContex _foodDbContex;
        private IMapper _mapper;
        public ProductReviewRepository(FoodDbContex dbContext, IMapper mapper) : base(dbContext, mapper)
        {
            _foodDbContex = dbContext;
            _mapper = mapper;
        }

        public async Task<ResultModal> CreateWithQuery(ProductReviewModal modal)
        {
            var data = _foodDbContex.ProductReviews.FirstOrDefault(r=> r.Id == modal.Id);
            if (data == null)
            {
                ProductReview result = _mapper.Map<ProductReview>(modal);
                _foodDbContex.ProductReviews.Add(result);
                await _foodDbContex.SaveChangesAsync();
                if (modal.productReviewImageModals != null)
                {
                    foreach (var item in modal.productReviewImageModals)
                    {
                        ProductReviewImage reviewImage = _mapper.Map<ProductReviewImage>(item);
                        string imageUrl = Helpper.Untils.UploadFileImage(item.ImageUrl, "Comment");
                        reviewImage.ImageUrl = imageUrl;
                        reviewImage.ProductReviewId = modal.Id;
                        _foodDbContex.ProductReviewImages.Add(reviewImage);
                    }
                }
                await _foodDbContex.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Chúc mừng bạn đã thêm bình luận thành công", Success = true };
            }
            else return new ResultModal() { Status = 202, Message = "Lỗi", Success = false };

        }

        public async Task<ResultModal> DeleteWithQuery(int id)
        {
            var db = _foodDbContex.ProductReviews.FirstOrDefault(r=> r.Id == id);   
            if(db != null)
            {
                var productReviewImage = _foodDbContex.ProductReviewImages.Where(r=> r.ProductReviewId == id).ToList();
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
    }
}
