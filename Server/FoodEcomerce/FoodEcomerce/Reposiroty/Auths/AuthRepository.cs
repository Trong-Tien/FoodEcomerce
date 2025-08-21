using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;
using Microsoft.EntityFrameworkCore;

namespace FoodEcomerce.Reposiroty.Auths
{
    public class AuthRepository : IAuthRepository
    {
        private readonly FoodDbContex _context;
        private readonly IMapper _mapper;   

        public AuthRepository(FoodDbContex contex, IMapper mapper)
        {
            _context = contex;
            _mapper = mapper;
        }
        public async Task<LoginDTO> Login(LoginModal modal)
        {
            if (modal.PhoneNumber == null || modal.Password == null) {
                return new LoginDTO();
            }
            var paswordHash = Helpper.Untils.EncrypePassword(modal.Password);
            var db = _context.Users.FirstOrDefault(x=> x.PhoneNumber == modal.PhoneNumber && modal.Password == paswordHash);
            if(db != null)
            {
                LoginDTO loginDTO = new LoginDTO()
                {
                    Id = db.Id,
                    Email = db.Email,
                    Address = db.Address,
                    PhoneNumber = db.PhoneNumber,
                    UserName = db.UserName, 
                };

            }    
            throw new NotImplementedException();
        }

        public Task<ResultModal> LoginWithMail(string token)
        {
            throw new NotImplementedException();
        }

        public async Task<ResultModal> Register(RegisterModal modal)
        {
            var dbUser  = await _context.Users.FirstOrDefaultAsync(x=> x.PhoneNumber == modal.PhoneNumber);
            if (dbUser == null) {
                var user = _mapper.Map<User>(modal);
                user.Password = Helpper.Untils.EncrypePassword(modal.Password);
                user.RoleId = Guid.Parse("e791c54a-15fc-401a-b376-b4f3e088c284");
                user.StatusId = 6;
                user.IsAdmin = false;
                user.Acvite = true;
                user.CreateUser = modal.UserName;
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Đăng ký thành công", Success = false };
            } return new ResultModal() {Status = 400 , Message="Số điện thoại đã tồn tại" , Success = false};
        }

        public Task<ResultModal> ResetPassword(ResetPasswordModal modal)
        {
            throw new NotImplementedException();
        }
    }
}
