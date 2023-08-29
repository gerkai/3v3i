using AutoMapper;
using Company.PunchlinePro.Identity.Controllers.Requests;
using Company.PunchlinePro.Identity.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using PdfSharpCore.Drawing;
using PdfSharpCore.Pdf;


namespace Company.PunchlinePro.Identity.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PdfController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly ITwilioService _twilioService;
        private readonly IReportService _reportService;


        public PdfController(IUserService userService, IMapper mapper, IWebHostEnvironment hostEnvironment,
        ITwilioService twilioService, IReportService reportService)
        {
            _userService = userService;
            _mapper = mapper;
            _hostEnvironment = hostEnvironment;
            _twilioService = twilioService;
            _reportService = reportService;
        }

        [HttpPost("Download")]
        public async Task<IActionResult> PostDownloadPdf([FromBody] CreatePDFRequest createPDFRequest) {

            var pdfDocument = await _reportService.CreateSiteFeasibilityReportPdf(createPDFRequest);

            using (var memoryStream = new MemoryStream())
            {
                pdfDocument.Save(memoryStream);
                return File(memoryStream.ToArray(), "application/pdf", "sample.pdf");
            }
        }

        [HttpPost("Email")]
        public async Task<IActionResult> PostEmailPdf([FromBody] CreatePDFRequest createPDFRequest)
        {
            var pdfDocument = await _reportService.CreateSiteFeasibilityReportPdf(createPDFRequest);

            if (!string.IsNullOrEmpty(createPDFRequest.toEmail)) {
                await _twilioService.SendSiteReport(createPDFRequest.toEmail, _hostEnvironment, pdfDocument);
            }

            return Ok();

        }
    }
}
