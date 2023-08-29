using PdfSharpCore.Pdf;

namespace Company.PunchlinePro.Identity.Services.Interfaces
{
    public interface ITwilioService
    {
        Task<bool> SendVerificationEmailAsync(
            string name,
            string email,
            string accountActivationToken,
            HttpContext httpContext,
            IWebHostEnvironment hostEnvironment);
        Task<bool> SendPasswordResetEmail(
            string name, 
            string email, 
            string passwordResetToken,
            HttpContext httpContext, 
            IWebHostEnvironment hostEnvironment);

        Task<bool> SendSiteReport(
            string email,
            IWebHostEnvironment hostEnvironment, 
            PdfDocument pdfDocument);
    }
}
