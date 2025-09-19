using MailKit.Net.Smtp;
using MimeKit;

namespace FoodEcomerce.Services
{
    public class SendMailServices
    {
        public static async Task SendOtpEmail(string toEmail, string otp)
        {
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress("YourApp", "vodangphat2002@gmail.com"));
            email.To.Add(new MailboxAddress("", toEmail));
            email.Subject = "Your OTP Code";

            email.Body = new TextPart("plain")
            {
                Text = $"Your OTP code is: {otp}. It will expire in 5 minutes."
            };

            using var smtp = new SmtpClient();
            await smtp.ConnectAsync("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync("vodangphat2002@gmail.com", "phnhagyuliyrokqx"); // app password
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }
    }
}
