using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;
using Microsoft.EntityFrameworkCore;

namespace FoodEcomerce.Reposiroty.Users
{
    public class UserRepository : BaseRepository<User, UserModal, UserDTO, Guid>, IUserRepository
    {
        private readonly FoodDbContex _foodDbContex;
        private readonly IMapper _mapper;

        public UserRepository(FoodDbContex dbContext , IMapper mapper) : base(dbContext , mapper)
        {
            _foodDbContex = dbContext;
            _mapper = mapper;   
        }

        public async Task<ResultModal> CreateWithQuery(UserModal modal)
        {
            var db = await _foodDbContex.Users.FirstOrDefaultAsync(r=> r.UserName == modal.UserName);
            if (db == null) {
                var user = _mapper.Map<User>(modal);
                user.Password = Helpper.Untils.EncrypePassword(modal.Password);
                user.CreateAt = DateTime.Now;
                user.CreateUser = modal.UserName;
                user.IsDelete = false;
                _foodDbContex.Users.Add(user);  
                await _foodDbContex.SaveChangesAsync();
                return new ResultModal() { Status = 200  ,Message ="Thêm mới thành công" ,Success = true};
            }
            else return new ResultModal() { Status = 202, Message = "Tài khoản đã tồn tại", Success = true };

        }
    }
}
