using Company.PunchlinePro.Identity.Controllers.Requests;
using Company.PunchlinePro.Identity.Services.Interfaces;
using PdfSharpCore.Drawing;
using PdfSharpCore.Drawing.Layout;
using PdfSharpCore.Pdf;
using SixLabors.Fonts;

namespace Company.PunchlinePro.Identity.Services
{
    public class ReportService : IReportService
    {
        public async Task<PdfDocument> CreateSiteFeasibilityReportPdf(CreatePDFRequest createPDFRequest)
        {
            var pdfDocument = new PdfDocument();
            var pdfPage = pdfDocument.AddPage();
            var graphics = XGraphics.FromPdfPage(pdfPage);

            var font = new XFont("Arial", 12, XFontStyle.Regular);

            // Build the content using data from the CreatePDFRequest object
            var content = $"Site Feasibility Report\n\n" +
              $"ID: {createPDFRequest.id}\n" +
              $"To Email: {createPDFRequest.toEmail}\n" +
              $"Name: {createPDFRequest.name}\n" +
              $"Address: {createPDFRequest.address}\n" +
              $"Attendee First Name: {createPDFRequest.attendeeFirstName}\n" +
              $"Attendee Last Name: {createPDFRequest.attendeeLastName}\n" +
              $"Date: {createPDFRequest.date}\n\n" + // Make sure to format the date properly

              // Site Feasibility Report Details
              $"Site Feasibility Report:\n" +
              $"Power Availability: {createPDFRequest.SiteFeasibilityReport?.powerAvailability}\n" +
              $"Power Availability Comments: {createPDFRequest.SiteFeasibilityReport?.powerAvailabilityComments}\n" +
              $"Existing Utility Transformer Type: {createPDFRequest.SiteFeasibilityReport?.existingUtilityTransformerType}\n" +
              $"Existing Utility Transformer Size: {createPDFRequest.SiteFeasibilityReport?.existingUtilityTransformerSize}\n" +
              // Continue adding other properties from SiteFeasibilityReport

              // Parking Lot Details
              $"Parking Lot Type: {createPDFRequest.SiteFeasibilityReport?.parkingLotType}\n" +
              $"Stall Count: {createPDFRequest.SiteFeasibilityReport?.stallCount}\n" +
              $"Parking Lot Lighting: {createPDFRequest.SiteFeasibilityReport?.parkingLotLighting}\n" +
              // Continue adding other parking lot properties

              // Accessibility Details
              $"Accessibility Required: {createPDFRequest.SiteFeasibilityReport?.accessibilityRequired}\n" +
              $"Accessibility Concerns: {createPDFRequest.SiteFeasibilityReport?.accessibilityConcerns}\n" +
              // Continue adding other accessibility properties

              // Carrier Details
              $"Carrier Type: {createPDFRequest.SiteFeasibilityReport?.carrierType}\n" +
              // Continue adding other carrier properties

              // Funding Details
              $"Current Funding: {createPDFRequest.SiteFeasibilityReport?.currentFunding}\n" +
              $"Funding Type: {createPDFRequest.SiteFeasibilityReport?.fundingType}\n" +
              $"Future Funding: {createPDFRequest.SiteFeasibilityReport?.futureFunding}\n" +
              $"Future Funding Date: {createPDFRequest.SiteFeasibilityReport?.futureFundingDate}\n" +
              // Continue adding other funding properties

              // Cost Details
              $"Station Cost: {createPDFRequest.SiteFeasibilityReport?.stationCost}\n" +
              $"Switchgear Cost: {createPDFRequest.SiteFeasibilityReport?.switchgearCost}\n" +
              $"Utility Cost: {createPDFRequest.SiteFeasibilityReport?.utilityCost}\n" +
              $"Engineering Cost: {createPDFRequest.SiteFeasibilityReport?.engineeringCost}\n" +
              $"Survey Cost: {createPDFRequest.SiteFeasibilityReport?.surveyCost}\n" +
              $"Construction Cost: {createPDFRequest.SiteFeasibilityReport?.constructionCost}\n" +
              $"Total Estimated Cost: {createPDFRequest.SiteFeasibilityReport?.totalEstimatedCost}\n\n" +

              // Additional Notes
              $"Additional Notes: {createPDFRequest.SiteFeasibilityReport?.additionalNotes}\n";

            // Draw the content on the PDF
            XRect rect = new XRect(40, 100, pdfPage.Width - 80, pdfPage.Height - 200);
            XTextFormatter tf = new XTextFormatter(graphics);
            tf.DrawString(content, font, XBrushes.Black, rect, XStringFormats.TopLeft);

            if (!string.IsNullOrEmpty(createPDFRequest.SiteFeasibilityReport?.transformerPhoto))
            {
                double x = 100;       // Adjust as needed
                double y = 200;       // Adjust as needed
                double width = 200;   // Adjust as needed
                double height = 150;  // Adjust as needed

                byte[] photoBytes = Convert.FromBase64String(createPDFRequest.SiteFeasibilityReport?.transformerPhoto);
                if (photoBytes != null && photoBytes.Length > 0)
                {
                    using (var ms = new MemoryStream(photoBytes))
                    {
                        XImage image = XImage.FromStream(() => ms);

                        graphics.DrawImage(image, x, y, width, height);

                    }
                }
            }

            if (!string.IsNullOrEmpty(createPDFRequest.SiteFeasibilityReport?.tieInPhoto))
            {
                double x = 100;       // Adjust as needed
                double y = 400;       // Adjust as needed
                double width = 200;   // Adjust as needed
                double height = 150;  // Adjust as needed

                byte[] photoBytes = Convert.FromBase64String(createPDFRequest.SiteFeasibilityReport?.tieInPhoto);
                if (photoBytes != null && photoBytes.Length > 0)
                {
                    using (var ms = new MemoryStream(photoBytes))
                    {
                        XImage image = XImage.FromStream(() => ms);

                        graphics.DrawImage(image, x, y, width, height);

                    }
                }
            }

            if (!string.IsNullOrEmpty(createPDFRequest.SiteFeasibilityReport?.stallLocationsPhoto))
            {
                double x = 100;       // Adjust as needed
                double y = 600;       // Adjust as needed
                double width = 200;   // Adjust as needed
                double height = 150;  // Adjust as needed

                byte[] photoBytes = Convert.FromBase64String(createPDFRequest.SiteFeasibilityReport?.stallLocationsPhoto);
                if (photoBytes != null && photoBytes.Length > 0)
                {
                    using (var ms = new MemoryStream(photoBytes))
                    {
                        XImage image = XImage.FromStream(() => ms);

                        graphics.DrawImage(image, x, y, width, height);

                    }
                }
            }

            if (!string.IsNullOrEmpty(createPDFRequest.SiteFeasibilityReport?.cellularReceptionPhoto))
            {
                double x = 100;       // Adjust as needed
                double y = 900;       // Adjust as needed
                double width = 200;   // Adjust as needed
                double height = 150;  // Adjust as needed

                byte[] photoBytes = Convert.FromBase64String(createPDFRequest.SiteFeasibilityReport?.cellularReceptionPhoto);
                if (photoBytes != null && photoBytes.Length > 0)
                {
                    using (var ms = new MemoryStream(photoBytes))
                    {
                        XImage image = XImage.FromStream(() => ms);

                        graphics.DrawImage(image, x, y, width, height);

                    }
                }
            }

            return pdfDocument;
        }
    }
}
