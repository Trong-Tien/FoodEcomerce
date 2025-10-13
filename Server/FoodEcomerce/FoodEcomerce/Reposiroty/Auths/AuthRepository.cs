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
            if (modal.PhoneNumber == null || modal.Password == null)
            {
                return new LoginDTO();
            }
            LoginDTO result = new LoginDTO();
            var paswordHash = Helpper.Untils.EncrypePassword(modal.Password);
            var db = await _context.Users.FirstOrDefaultAsync(x => x.PhoneNumber == modal.PhoneNumber && x.Password == paswordHash);
           
            if (db != null)
            {
                var CartItem = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == db.Id);
                result = new LoginDTO()
                {
                    Id = db.Id,
                    Email = db.Email,
                    Address = db.Address,
                    PhoneNumber = db.PhoneNumber,
                    UserName = db.UserName,
                    RoleId = db.RoleId,
                    CartId = CartItem != null ? CartItem.Id : Guid.Empty,   
                    Status = 200
                };
                if (!string.IsNullOrEmpty(result.Email) || !string.IsNullOrEmpty(result.UserName))
                {
                    result.AccessToken = Helpper.Untils.GenerateAccessToken(result.PhoneNumber, result.UserName, result.RoleId);
                }
                else
                {
                    result.AccessToken = null;
                }


                result.RefeshToken = Helpper.Untils.GenerateRefreshToken();
                result.Expires = DateTime.UtcNow.AddMinutes(15);
            }


            return result;
        }

        public Task<ResultModal> LoginWithMail(string token)
        {
            throw new NotImplementedException();
        }

        public async Task<LoginDTO> LoginWithWebUser(LoginWithWebUserModal modal)
        {
            if (modal.UserName == null || modal.Password == null)
            {
                return new LoginDTO();
            }
            LoginDTO result = new LoginDTO();
            var paswordHash = Helpper.Untils.EncrypePassword(modal.Password);
            var db = await _context.Users.FirstOrDefaultAsync(x => x.UserName == modal.UserName && x.Password == paswordHash);
            if (db != null)
            {
                result = new LoginDTO()
                {
                    Id = db.Id,
                    Email = db.Email,
                    Address = db.Address,
                    PhoneNumber = db.PhoneNumber,
                    UserName = db.UserName,
                    RoleId = db.RoleId,
                    Status = 200
                };
                if (!string.IsNullOrEmpty(result.Email) || !string.IsNullOrEmpty(result.UserName))
                {
                    result.AccessToken = Helpper.Untils.GenerateAccessToken(result.PhoneNumber, result.UserName, result.RoleId);
                }
                else
                {
                    result.AccessToken = null;
                }

                result.RefeshToken = Helpper.Untils.GenerateRefreshToken();
                result.Expires = DateTime.UtcNow.AddMinutes(30);
            }
            return result;
        }

        public async Task<ResultModal> Register(RegisterModal modal)
        {
            var dbUser = await _context.Users.FirstOrDefaultAsync(x => x.PhoneNumber == modal.PhoneNumber);
            // veriy OTP 
            var otpValue = await _context.OTPs.FirstOrDefaultAsync(x => x.Code == modal.OTP && x.Email == modal.Email);
            if (otpValue != null)
            {
                if (otpValue.Expiry > DateTime.UtcNow)
                {
                    if (dbUser == null)
                    {
                        var user = _mapper.Map<User>(modal);
                        user.Id = Guid.NewGuid();
                        user.Password = Helpper.Untils.EncrypePassword(modal.Password);
                        user.RoleId = Guid.Parse("e791c54a-15fc-401a-b376-b4f3e088c284");
                        user.StatusId = 1;
                        user.IsAdmin = false;
                        user.Acvite = true;
                        user.CreateUser = modal.UserName;
                        _context.Users.Add(user);
                        _context.OTPs.Remove(otpValue);

                        Cart cart = new Cart(); 
                        cart.Id = Guid.NewGuid();
                        cart.UserId = user.Id;
                        cart.CreateAt = DateTime.UtcNow;
                        _context.Carts.Add(cart);   

                        await _context.SaveChangesAsync();

                        return new ResultModal() { Status = 200, Message = "Đăng ký thành công", Success = false };
                    }
                }
                else
                {
                    _context.OTPs.Remove(otpValue);
                    await _context.SaveChangesAsync();
                    return new ResultModal() { Status = 400, Message = "OTP đã hết hạn , vui lòng gửi lại OTP để đăng ký", Success = false };
                };

            }
            return new ResultModal() { Status = 400, Message = "OTP không hợp lệ", Success = false };


        }


        public Task<ResultModal> ResetPassword(ResetPasswordModal modal)
        {
            throw new NotImplementedException();
        }
    }
}
