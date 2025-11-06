using AutoMapper;
using Azure.Core;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;
using Google.Apis.Auth;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

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
            if (modal.Email == null || modal.Password == null)
            {
                return new LoginDTO();
            }
            LoginDTO result = new LoginDTO();
            var paswordHash = Helpper.Untils.EncrypePassword(modal.Password);
            var db = await _context.Users.FirstOrDefaultAsync(x => x.Email == modal.Email && x.Password == paswordHash);

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
                if (!string.IsNullOrEmpty(result.Email))
                {
                    result.AccessToken = Helpper.Untils.GenerateAccessToken(result.Id, result.UserName, result.RoleId);
                }
                else
                {
                    result.AccessToken = null;
                }
                var cookieOptions = new CookieOptions
                {

                    Expires = DateTimeOffset.UtcNow.AddMinutes(30)
                };

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
                    result.AccessToken = Helpper.Untils.GenerateAccessToken(result.Id, result.UserName, result.RoleId);
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
            var dbUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == modal.Email);
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
                        user.UserName = modal.Email;
                        user.StatusId = 1;
                        user.IsAdmin = false;
                        user.Acvite = true;
                        user.CreateUser = modal.Email;
                        _context.Users.Add(user);
                        _context.OTPs.Remove(otpValue);

                        Cart cart = new Cart();
                        cart.Id = Guid.NewGuid();
                        cart.UserId = user.Id;
                        cart.CreateAt = DateTime.UtcNow;
                        _context.Carts.Add(cart);

                        await _context.SaveChangesAsync();

                        return new ResultModal() { Status = 200, Message = "Đăng ký thành công", Success = true };
                    }
                    else return new ResultModal() { Status = 202, Message = "Tài khoản đã tồn tại trong hệ thống", Success = false };
                }
                else
                {
                    _context.OTPs.Remove(otpValue);
                    await _context.SaveChangesAsync();
                    return new ResultModal() { Status = 400, Message = "OTP đã hết hạn , vui lòng gửi lại OTP để đăng ký", Success = false };
                }
                ;

            }
            return new ResultModal() { Status = 400, Message = "OTP không hợp lệ", Success = false };


        }

        public async Task<LoginDTO> LoginWithGoogle(GoogleLoginModal modal)
        {
            var payload = await GoogleJsonWebSignature.ValidateAsync(modal.Token);
            
            LoginDTO result = new LoginDTO();

            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == payload.Email);
                if (user == null)
                {
                    User data = new User();
                    data.Id = Guid.NewGuid();
                    data.Email = payload.Email;
                    data.UserName = payload.FamilyName;
                    data.Password = null;
                    data.RoleId = Guid.Parse("e791c54a-15fc-401a-b376-b4f3e088c284");
                    data.UserName = payload.Email;
                    data.StatusId = 1;
                    data.IsAdmin = false;
                    data.Acvite = true;
                    data.CreateUser = payload.FamilyName;

                    _context.Users.Add(data);

                    var cart = new Cart
                    {
                        Id = Guid.NewGuid(),
                        UserId = data.Id,
                        CreateAt = DateTime.UtcNow
                    };
                    _context.Carts.Add(cart);

                    await _context.SaveChangesAsync();

                    result.Id = data.Id;
                    result.Email = data.Email;
                    result.UserName = data.UserName;
                    result.RoleId = data.RoleId;
                    result.AccessToken = Helpper.Untils.GenerateAccessToken(data.Id, data.UserName, data.RoleId);
                    result.RefeshToken = Helpper.Untils.GenerateRefreshToken();
                    result.Expires = DateTime.UtcNow.AddMinutes(30);
                    result.Status = 200;
                    result.CartId = cart.Id;

                }
                else
                {
                    var cartData = _context.Carts.FirstOrDefault(c => c.UserId == user.Id);
                    result.Id = user.Id;
                    result.Email = user.Email;
                    result.UserName = user.UserName;
                    result.RoleId = user.RoleId;
                    result.AccessToken = Helpper.Untils.GenerateAccessToken(user.Id, user.UserName, user.RoleId);
                    result.RefeshToken = Helpper.Untils.GenerateRefreshToken();
                    result.Expires = DateTime.UtcNow.AddMinutes(30);
                    result.Status = 200;
                    result.CartId = cartData != null ? cartData.Id : Guid.Empty;
                }

                return result;
            }
            catch (Exception ex) {
                result.Status = 500;
                return result;
            }
      

        }


        // ======================= LOGIN VỚI FACEBOOK =======================
        public async Task<LoginDTO> LoginWithFacebook(FacebookLoginModal modal)
        {
            using var http = new HttpClient();
            var response = await http.GetAsync($"https://graph.facebook.com/me?fields=id,name,email&access_token={modal.AccessToken}");
            var json = await response.Content.ReadAsStringAsync();
            var data = JsonConvert.DeserializeObject<FacebookUser>(json);

            if (data == null || string.IsNullOrEmpty(data.Email))
                throw new Exception("Không thể xác minh tài khoản Facebook.");

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == data.Email);
            if (user == null)
            {
                user = new User
                {
                    Id = Guid.NewGuid(),
                    Email = data.Email,
                    UserName = data.Name ?? data.Email,
                    RoleId = Guid.Parse("e791c54a-15fc-401a-b376-b4f3e088c284"),
                    Password = "",
                    StatusId = 1,
                    IsAdmin = false,
                    Acvite = true,
                    CreateUser = data.Email
                };

                _context.Users.Add(user);

                // ✅ Tạo giỏ hàng mặc định
                var cart = new Cart
                {
                    Id = Guid.NewGuid(),
                    UserId = user.Id,
                    CreateAt = DateTime.UtcNow
                };
                _context.Carts.Add(cart);

                await _context.SaveChangesAsync();
            }

            // ✅ Trả về thông tin login
            return new LoginDTO
            {
                Id = user.Id,
                Email = user.Email,
                UserName = user.UserName,
                RoleId = user.RoleId,
                AccessToken = Helpper.Untils.GenerateAccessToken(user.Id, user.UserName, user.RoleId),
                RefeshToken = Helpper.Untils.GenerateRefreshToken(),
                Expires = DateTime.UtcNow.AddMinutes(15),
                Status = 200
            };
        }


        // ✅ Class phụ cho Facebook
        private class FacebookUser
        {
            public string Id { get; set; } = string.Empty;
            public string Name { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
        }



        public Task<ResultModal> ResetPassword(ResetPasswordModal modal)
        {
            throw new NotImplementedException();
        }
    }
}
