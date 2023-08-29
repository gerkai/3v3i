using Company.PunchlinePro.Identity.Controllers.Requests;
using PdfSharpCore.Pdf;

namespace Company.PunchlinePro.Identity.Services.Interfaces
{
    public interface IReportService
    {
        Task<PdfDocument> CreateSiteFeasibilityReportPdf(
            CreatePDFRequest createPDFRequest);
    }
}
