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
using FoodEcomerce.Entity.StoreProcedure;

namespace FoodEcomerce.Reposiroty.Orderss
{
    public class OrdersRepository : BaseRepository<Orders, OrderModal, OrderDTO, Guid>, IOrderRepository
    {
        private readonly FoodDbContex _context;
        private readonly IMapper _mapper;
        private readonly StoreDbcontext _storeContext;
        public OrdersRepository(FoodDbContex dbContext, IMapper mapper , StoreDbcontext spdContext) : base(dbContext, mapper)
        {
            _context = dbContext;
            _mapper = mapper;   
            _storeContext = spdContext;
        }

        public async Task<ResultModal> CreateWithQuery(OrderModal modal)
        {
            var ordersData = _context.Orders.FirstOrDefault(r=> r.Id == modal.Id);
            if (ordersData == null)
            {
              var item =  _mapper.Map<Orders>(modal);
              item.Id = Guid.NewGuid();
              item.StatusId = 1;
              item.OrderDate = DateTime.Now;
              item.PaymentMenthodId = modal.PaymentMenthodId;
              _context.Orders.Add(item);
              List<OrderDetail> ordersDetail = new List<OrderDetail>();
                if (modal.OrdersDetails != null) {
                    foreach (var item1 in modal.OrdersDetails)
                    {
                        var dataDetail = _mapper.Map<OrderDetail>(item1);
                        dataDetail.OrderId = item.Id;

                        ordersDetail.Add(dataDetail);
                    }
                    _context.OrderDetail.AddRange(ordersDetail);
                }
               
                await _context.SaveChangesAsync();

                var itemUser = await _context.Users.FirstOrDefaultAsync(r=> r.Id == modal.UserId);

                var email = new MimeMessage();
                email.From.Add(new MailboxAddress("YourApp", "vodangphat2002@gmail.com"));
                email.To.Add(new MailboxAddress("", itemUser.Email));
                email.Subject = "Đơn đặt hàng";

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
                                <p>Cảm ơn bạn đã đặt hàng tại trang web của chúng tôi</p>

                                <p>Đơn hàng của bạn đã được tiếp nhận và đang được xử lý.</p>

                                <h3>Thông tin đơn hàng:</h3>
                                <table>
                                  <tr><th>Mã đơn hàng</th><td>{modal.Id}</td></tr>
                                  <tr><th>Tổng tiền</th><td>{modal.TotalPrice:N0} ₫</td></tr>
                                  <tr><th>Ngày đặt</th><td>{DateTime.Now:dd/MM/yyyy HH:mm}</td></tr>
                                </table>

                          
                                <div class='footer'>
                                  <p>Cảm ơn bạn đã mua sắm tại <strong>Organic Store</strong> ❤️</p>
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

        public async Task<List<sp_WebFood_GetAllOrders>> GetAllWithQuery(Guid? userId, int statusId, int pageNumber, int pageSize)
        {
            return await  _storeContext.sp_WebFood_GetAllOrders.FromSqlInterpolated($"Execute sp_WebFood_GetAllOrders @NguoiDungId={userId} , @Status={statusId} , @PageNumber={pageNumber}, @PageSize={pageSize}").ToListAsync();  
        }

        public async Task<ResultModal> UpdateWithQuery(Guid orderId, int type)
        {
            var orderData = _context.Orders.FirstOrDefault(r=> r.Id == orderId);
            string orderMessage = ""; 
            if(orderData != null)
            {
                if (type == 1) { orderData.StatusOrdersId = 3; orderMessage = "Đơn hàng đã được xác nhận thành công"; }
                else if (type == 2) { orderData.StatusOrdersId = 5; orderMessage = "Đơn hàng đã được chuyển sang trạng thái đang giao hàng "; }
                else if (type == 3) { orderData.StatusOrdersId = 6; orderMessage = "Chúc mừng ! đơn hàng đã được giao thành công"; }
                else if (type == 4) { orderData.StatusOrdersId = 7; orderMessage = "Đơn hàng đã được hủy thành công";  }

                _context.Orders.Update(orderData);   

                await _context.SaveChangesAsync();

                return new ResultModal() { Status = 200, Message = orderMessage, Success = true };

            }
            else return new ResultModal() { Status = 202, Message = "Không tìm thấy đơn hàng", Success = false };
        }
    }
}
