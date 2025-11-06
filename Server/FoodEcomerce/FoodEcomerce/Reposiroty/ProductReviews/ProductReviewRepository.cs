using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;

namespace FoodEcomerce.Reposiroty.ProductReviews
{
    public class ProductReviewRepository : BaseRepository<ProductReview, ProductReviewModal, ProductReviewDTO, Guid>, IProductReviewRepository
    {
        public ProductReviewRepository(FoodDbContex dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public Task<ResultModal> CreateWithQuery(ProductReviewModal modal)
        {
            throw new NotImplementedException();
        }
    }
}
