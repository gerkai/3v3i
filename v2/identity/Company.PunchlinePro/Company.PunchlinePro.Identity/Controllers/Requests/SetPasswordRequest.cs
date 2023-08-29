namespace Company.PunchlinePro.Identity.Controllers.Requests
{
    public class SetPasswordRequest
    {
        public string Password { get; set; }
        public string ResetPasswordToken { get; set; }
    }
}
