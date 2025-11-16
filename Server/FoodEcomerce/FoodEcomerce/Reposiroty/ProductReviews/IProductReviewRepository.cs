using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.ProductReviews
{
    public interface IProductReviewRepository : IBaseRepository<ProductReview , ProductReviewModal , ProductReviewDTO , Guid>
    {
        Task<ResultModal> CreateWithQuery(ProductReviewModal modal);
        Task<ResultModal> DeleteWithQuery(Guid id);    
        Task<List<ProductReviewDTO>> GetReviewByProductId(Guid id);
    }
}
