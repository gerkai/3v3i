using Company.PunchlinePro.Identity.Services.Models;

namespace Company.PunchlinePro.Identity.Services.Interfaces
{
    public interface IUserService
    {
        Task<string> Authenticate(string email, string password);
        Task<string> AuthenticateByRefreshToken(string refreshToken);
        Task<bool> DoesUserExistWithThisEmail(string email);
        Task<int> CreateUser(string email, string name, string password);
        Task<bool> ActivateUser(string activationToken);
        Task<int> GetUserIdBasedOnValidRefreshToken(string refreshToken);
        Task<UserModel?> GetUserById(int id);
        Task<UserModel?> GetUserByEmail(string email);
        Task<string> ResetPasswordByEmail(string email);
        Task ResetPasswordByToken(string password, string passwordResetToken);
        Task<bool> DeleteUser(int id);
    }
}
