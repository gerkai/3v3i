using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Company.PunchlinePro.Identity.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HealthController : ControllerBase
    {

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok();
        }

    }
}
