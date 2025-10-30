using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using System.Net.Mail;
using static System.Net.WebRequestMethods;
using MailKit.Net.Smtp;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;

namespace FoodEcomerce.Reposiroty.Orderss
{
    public class OrdersRepository : BaseRepository<Orders, OrderModal, OrderDTO, Guid>, IOrderRepository
    {
        private readonly FoodDbContex _context;
        private readonly IMapper _mapper;
        public OrdersRepository(FoodDbContex dbContext, IMapper mapper) : base(dbContext, mapper)
        {
            _context = dbContext;
            _mapper = mapper;   
        }

        public async Task<ResultModal> CreateWithQuery(OrderModal modal)
        {
            var ordersData = _context.Orders.FirstOrDefault(r=> r.Id == modal.Id);
            if (ordersData != null)
            {
              var item =  _mapper.Map<Orders>(modal);
              item.Id = Guid.NewGuid();   
              _context.Orders.Add(item);
              List<OrderDetail> ordersDetail = new List<OrderDetail>(); 
                foreach (var item1 in modal.OrdersDetails)
                {
                    var dataDetail = _mapper.Map<OrderDetail>(item1);
                    dataDetail.OrderId = Guid.NewGuid();
                    ordersDetail.Add(dataDetail);
                }
               _context.OrderDetail.AddRange(ordersDetail);
                await _context.SaveChangesAsync();

                var itemUser = await _context.Users.FirstOrDefaultAsync(r=> r.Id == modal.UserId);

                var email = new MimeMessage();
                email.From.Add(new MailboxAddress("YourApp", "vodangphat2002@gmail.com"));
                email.To.Add(new MailboxAddress("", itemUser.Email));
                email.Subject = "Your OTP Code";

                var builder = new BodyBuilder();

                builder.HtmlBody = $@"
                            <!DOCTYPE html>
                            <html>
                            <head>
                              <meta charset='UTF-8' />
                              <style>
                                body {{
                                  font-family: 'Segoe UI', Arial, sans-serif;
                                  background-color: #f9f9f9;
                                  margin: 0;
                                  padding: 0;
                                }}
                                .container {{
                                  background-color: #ffffff;
                                  max-width: 600px;
                                  margin: 30px auto;
                                  border-radius: 12px;
                                  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                                  padding: 30px;
                                }}
                                h2 {{
                                  color: #2e7d32;
                                }}
                                .button {{
                                  display: inline-block;
                                  background-color: #4CAF50;
                                  color: #fff;
                                  padding: 12px 24px;
                                  text-decoration: none;
                                  border-radius: 6px;
                                  margin-top: 20px;
                                }}
                                .footer {{
                                  text-align: center;
                                  color: #777;
                                  font-size: 13px;
                                  margin-top: 30px;
                                }}
                                table {{
                                  width: 100%;
                                  border-collapse: collapse;
                                  margin-top: 15px;
                                }}
                                th, td {{
                                  border: 1px solid #ddd;
                                  padding: 10px;
                                  text-align: left;
                                }}
                                th {{
                                  background-color: #f2f2f2;
                                }}
                              </style>
                            </head>
                            <body>
                              <div class='container'>
                                <h2>Xin chào {itemUser.UserName ?? "Quý khách"},</h2>
                                <p>Cảm ơn bạn đã đặt hàng tại <strong>YourApp</strong>! 🎉</p>

                                <p>Đơn hàng của bạn đã được tiếp nhận và đang được xử lý.</p>

                                <h3>Thông tin đơn hàng:</h3>
                                <table>
                                  <tr><th>Mã đơn hàng</th><td>{modal.Id}</td></tr>
                                  <tr><th>Tổng tiền</th><td>{modal.TotalPrice:N0} ₫</td></tr>
                                  <tr><th>Ngày đặt</th><td>{DateTime.Now:dd/MM/yyyy HH:mm}</td></tr>
                                </table>

                          
                                <div class='footer'>
                                  <p>Cảm ơn bạn đã mua sắm tại <strong>YourApp</strong> ❤️</p>
                                  <p>Đây là email tự động, vui lòng không trả lời.</p>
                                </div>
                              </div>
                            </body>
                            </html>
                            ";

                email.Body = builder.ToMessageBody();

                using var smtp = new SmtpClient();
                await smtp.ConnectAsync("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
                await smtp.AuthenticateAsync("vodangphat2002@gmail.com", "phnhagyuliyrokqx"); 
                await smtp.SendAsync(email);
                await smtp.DisconnectAsync(true);




                return new ResultModal() { Status = 200 , Message="Đặt hàng thành công" , Success = true }; 
            }
            return new ResultModal() { Status = 202, Message = "Đơn hàng đã tồn tại", Success = true };
        }
    }
}
