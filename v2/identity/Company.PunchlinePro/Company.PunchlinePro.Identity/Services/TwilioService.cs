using Company.PunchlinePro.Identity.Services.Interfaces;
using PdfSharpCore.Pdf;
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
                "EmailTemplates",
                "ResetPasswordEmailTemplate.html");
            string htmlContent = System.IO.File.ReadAllText(htmlFilePath);
            htmlContent = htmlContent.Replace("{{activation-token}}", passwordResetToken);
            var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("connor.mcelroy@xyzz.dev", "Punchline Pro");
            var subject = "Password Reset Request";
            var to = new EmailAddress(email, name);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, null, htmlContent);
            var response = await client.SendEmailAsync(msg);

            if (response.IsSuccessStatusCode)
            {
                return true;
            }
            else
            {
                // Email sending failed, log the error message
                var responseBody = await response.Body.ReadAsStringAsync();
                Console.WriteLine($"Email sending failed. Response status code: {response.StatusCode}");
                Console.WriteLine($"Response body: {responseBody}");
                return false;
            }
        }

        public async Task<bool> SendVerificationEmailAsync(string name, string email, string accountActivationToken, 
            HttpContext httpContext, IWebHostEnvironment hostEnvironment)
        {
            string serverUrl = $"{httpContext.Request.Scheme}://{httpContext.Request.Host.Value}";
            serverUrl += $"/activated?activationtoken={accountActivationToken}";
            string htmlFilePath = Path.Combine(hostEnvironment.ContentRootPath,
                "EmailTemplates",
                "ActivateUserEmailTemplate.html");
            string htmlContent = System.IO.File.ReadAllText(htmlFilePath);
            htmlContent = htmlContent.Replace("{{verification-link}}", serverUrl);
            htmlContent = htmlContent.Replace("{{activation-token}}", accountActivationToken);
            htmlContent = htmlContent.Replace("{{email}}", email);

            var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("connor.mcelroy@xyzz.dev", "Punchline Pro");
            var subject = "Email Verification";
            var to = new EmailAddress(email, name);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, null, htmlContent);
            var response = await client.SendEmailAsync(msg);

            if (response.IsSuccessStatusCode)
            {
                return true;
            }
            else
            {
                // Email sending failed, log the error message
                var responseBody = await response.Body.ReadAsStringAsync();
                Console.WriteLine($"Email sending failed. Response status code: {response.StatusCode}");
                Console.WriteLine($"Response body: {responseBody}");
                return false;
            }

        }

        public async Task<bool> SendSiteReport(string email, 
            IWebHostEnvironment hostEnvironment, 
            PdfDocument pdfDocument)
        {

            string htmlFilePath = Path.Combine(hostEnvironment.ContentRootPath,
                "EmailTemplates",
                "SiteReportEmailTemplate.html");
            string htmlContent = System.IO.File.ReadAllText(htmlFilePath);

            // Convert PdfDocument to a byte array
            byte[] pdfBytes;
            using (MemoryStream ms = new MemoryStream())
            {
                pdfDocument.Save(ms);
                pdfBytes = ms.ToArray();
            }

            var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("connor.mcelroy@xyzz.dev", "Punchline Pro");
            var subject = "Site Feasibility Report";
            var to = new EmailAddress(email, email);

            var msg = MailHelper.CreateSingleEmail(from, to, subject, null, htmlContent);

            // Attach the PDF to the email
            msg.Attachments = new List<SendGrid.Helpers.Mail.Attachment>
            {
                new SendGrid.Helpers.Mail.Attachment
                {
                    Content = Convert.ToBase64String(pdfBytes),
                    Filename = "site_report.pdf",
                    Type = "application/pdf",
                    Disposition = "attachment"
                }
            };

            var response = await client.SendEmailAsync(msg);

            if (response.IsSuccessStatusCode)
            {
                return true;
            }
            else
            {
                // Email sending failed, log the error message
                var responseBody = await response.Body.ReadAsStringAsync();
                Console.WriteLine($"Email sending failed. Response status code: {response.StatusCode}");
                Console.WriteLine($"Response body: {responseBody}");
                return false;
            }
        }
    }
}
