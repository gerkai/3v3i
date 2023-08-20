using Company.PunchlinePro.Identity.Services.Interfaces;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Net.Mail;

namespace Company.PunchlinePro.Identity.Services
{
    public class TwilioService : ITwilioService
    {
        public async Task<bool> SendPasswordResetEmail(string name, string email, string passwordResetToken,
                HttpContext httpContext, IWebHostEnvironment hostEnvironment)
        {
            string serverUrl = $"{httpContext.Request.Scheme}://{httpContext.Request.Host.Value}";
            serverUrl += $"/password-reset?passwordresettoken={passwordResetToken}";
            string htmlFilePath = Path.Combine(hostEnvironment.ContentRootPath,
                "HTMLTemplates",
                "ResetPasswordEmailTemplate.html");
            string htmlContent = System.IO.File.ReadAllText(htmlFilePath);
            htmlContent = htmlContent.Replace("{{password-reset-link}}", serverUrl);

            var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("support@moosara.com", "Moosara");
            var subject = "Password Reset Request";
            var to = new EmailAddress(email, name);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, null, htmlContent);
            var response = await client.SendEmailAsync(msg);

            if (response.IsSuccessStatusCode)
            {
                return true;
            }

            return false;
        }

        public async Task<bool> SendVerificationEmailAsync(string name, string email, string accountActivationToken, 
            HttpContext httpContext, IWebHostEnvironment hostEnvironment)
        {
            string serverUrl = $"{httpContext.Request.Scheme}://{httpContext.Request.Host.Value}";
            serverUrl += $"/activated?activationtoken={accountActivationToken}";
            string htmlFilePath = Path.Combine(hostEnvironment.ContentRootPath,
                "HTMLTemplates",
                "ActivateUserEmailTemplate.html");
            string htmlContent = System.IO.File.ReadAllText(htmlFilePath);
            htmlContent = htmlContent.Replace("{{verification-link}}", serverUrl);
            htmlContent = htmlContent.Replace("{{email}}", email);

            var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("support@moosara.com", "Moosara");
            var subject = "Email Verification";
            var to = new EmailAddress(email, name);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, null, htmlContent);
            var response = await client.SendEmailAsync(msg);

            if (response.IsSuccessStatusCode)
            {
                return true;
            }

            return false;
        }
    }
}
