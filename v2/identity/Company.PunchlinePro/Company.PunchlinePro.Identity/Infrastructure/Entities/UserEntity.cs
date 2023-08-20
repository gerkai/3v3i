using System.ComponentModel.DataAnnotations;

namespace Company.PunchlinePro.Identity.Infrastructure.Entities
{
    public class UserEntity
    {

        [Key]
        public int Id { get; set; }
        [Required(AllowEmptyStrings = false)]
        public string Name { get; set; }
        [Required(AllowEmptyStrings = false)]
        public string Password { get; set; }
        [Required(AllowEmptyStrings = false)]
        public string Email { get; set; }
        public bool IsActive { get; set; } = false;
        public string ActivationToken { get; set; }
        public string RefreshToken { get; set; } = String.Empty;
        public DateTime RefreshExpiration { get; set; } = DateTime.UtcNow;
        public string ResetPasswordToken { get; set; } = String.Empty;
        public DateTime RefreshPasswordTokenExpiration { get; set; } = DateTime.UtcNow;

    }
}
