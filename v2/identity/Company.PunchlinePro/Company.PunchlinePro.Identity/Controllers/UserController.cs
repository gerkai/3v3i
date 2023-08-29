using AutoMapper;
using Company.PunchlinePro.Identity.Controllers.Requests;
using Company.PunchlinePro.Identity.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Company.PunchlinePro.Identity.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly ITwilioService _twilioService;

        public UserController(IUserService userService, IMapper mapper, IWebHostEnvironment hostEnvironment,
        ITwilioService twilioService)
        {
            _userService = userService;
            _mapper = mapper;
            _hostEnvironment = hostEnvironment;
            _twilioService = twilioService;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> PostRegister(RegisterUserRequest registerUserRequest)
        {
            var newUserId = await _userService.CreateUser(registerUserRequest.Email, registerUserRequest.Name, registerUserRequest.Password);

            if (newUserId is 0)
            {
                return Conflict();
            }

            var newUser = await _userService.GetUserById(newUserId);

            var activationEmailSent = await _twilioService.SendVerificationEmailAsync(newUser.Name, newUser.Email,
                newUser.ActivationToken, HttpContext, _hostEnvironment);

            if (activationEmailSent)
            {
                return Ok();
            }

            await _userService.DeleteUser(newUser.Id);

            return StatusCode(500);
        }

        [HttpPost("Activate")]
        public async Task<IActionResult> PostActivate([FromBody] ActivateUserRequest activateUserRequest)
        {
            var userIsActive = await _userService.ActivateUser(activateUserRequest.ActivationToken);

            return userIsActive ? Ok() : BadRequest();
        }

        [HttpPost("Login")]
        public async Task<IActionResult> PostLogin([FromBody] LoginUserRequest loginUserRequest)
        {
            var jwtToken = await _userService.Authenticate(loginUserRequest.Email, loginUserRequest.Password);

            var tokenObject = new { 
                token = jwtToken   
            };

            return Ok(tokenObject);
        }

        [HttpPost("ResetPasswordRequest")]
        public async Task<IActionResult> ResetPasswordRequest([FromBody] ResetPasswordRequest resetPasswordRequest)
        {

            var user = await _userService.GetUserByEmail(resetPasswordRequest.Email);

            if (user is null || !user.IsActive)
            {
                return Ok();
            }

            var passwordResetToken = await _userService.ResetPasswordByEmail(resetPasswordRequest.Email);

            await _twilioService.SendPasswordResetEmail(user.Name, resetPasswordRequest.Email, passwordResetToken, HttpContext, _hostEnvironment);

            return Ok();

        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] SetPasswordRequest setPasswordRequest)
        {
            await _userService.ResetPasswordByToken(setPasswordRequest.Password, setPasswordRequest.ResetPasswordToken);

            return Ok();
        }
    }
}
