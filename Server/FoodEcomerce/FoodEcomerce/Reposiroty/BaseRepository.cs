using AutoMapper;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace FoodEcomerce.Reposiroty
{
    public abstract class BaseRepository<T, TModal, TDto, TId> : IBaseRepository<T, TModal, TDto, TId> where T : class
    {
        private readonly FoodDbContex _dbContext;
        private readonly IMapper _mapper;

        public BaseRepository(FoodDbContex dbContext , IMapper mapper )
        {
            _dbContext = dbContext;
            _mapper = mapper;   
        }
        public async Task<List<TDto>> GetAll(params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> values = _dbContext.Set<T>();
            foreach (var include in includes)
            {
                values = values.Include(include);
            }
            return _mapper.Map<List<TDto>>(await values.ToListAsync());
        }
        public async Task<TDto> GetById(object id, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _dbContext.Set<T>();
            foreach (var item in includes)
            {
                query = query.Include(item);
            }
            return _mapper.Map<TDto>(await query.FirstOrDefaultAsync(e => EF.Property<object>(e, "Id").Equals(id)));
        }
        public async Task<ResultModal> Create(TModal entity)
        {
            var entityId = entity.GetType().GetProperty("Id")?.GetValue(entity, null);
            var data = _dbContext.Set<T>().Where(e => EF.Property<object>(e, "Id").Equals(entityId)).FirstOrDefault();
            if(data == null)
            {
                var mappedEntity = _mapper.Map<T>(entity);
                await _dbContext.Set<T>().AddAsync(mappedEntity);
                await _dbContext.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Thêm mới thành công", Success = true };
            } else return new ResultModal() { Status = 202, Message = "Không timg thấy dữ liệu", Success = false };
        }
        public async Task<ResultModal> Update(TModal entity)
        {
            var entityId = entity.GetType().GetProperty("Id")?.GetValue(entity, null);
            var data = await _dbContext.Set<T>()
                .FirstOrDefaultAsync(e => EF.Property<object>(e, "Id").Equals(entityId));

            if (data != null)
            {
                // lấy đường dẫn image hiện tại có trong data
                var fileProp = data.GetType().GetProperty("ImageUrl");
                var url = fileProp != null ? fileProp.GetValue(data) as string : null;

                // nếu entity có file mới → xóa file cũ
                if (url != null && entity.GetType().GetProperty("ImageFile")?.GetValue(entity) != null)
                {
                    Helpper.Untils.DeleteFile(url);
                }

                // map giá trị mới vào entity đã được tracking
                _mapper.Map(entity, data);

                await _dbContext.SaveChangesAsync();

                return new ResultModal()
                {
                    Status = 200,
                    Message = "Cập nhật thành công",
                    Success = true
                };
            }

            return new ResultModal()
            {
                Status = 404,
                Message = "Không tìm thấy dữ liệu",
                Success = false
            };
        }

        public async Task<ResultModal> Delete(object id)
        {
            var data = await _dbContext.Set<T>().FirstOrDefaultAsync(e => EF.Property<object>(e, "Id").Equals(id));
            if (data != null)
            {
                var Url = data.GetType().GetProperty("ImageUrl");
                var url = Url != null ? Url.GetValue(data) as string : null;
                if (url != null) { Helpper.Untils.DeleteFile(url); }
                _dbContext.Set<T>().Remove(data);
                await _dbContext.SaveChangesAsync();
                return new ResultModal() { Status = 200, Success = true, Message = "Xóa dữ liệu thành công" };
            } else return new ResultModal() { Status = 202, Success = false, Message = "Không tìm thấy dữ liệu" };

        }


     
    }
}
