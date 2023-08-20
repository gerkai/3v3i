using AutoMapper;
using Bogus;
using Company.PunchlinePro.Identity.Helpers;
using Company.PunchlinePro.Identity.Infrastructure;
using Company.PunchlinePro.Identity.Infrastructure.Entities;
using Company.PunchlinePro.Identity.Services.Interfaces;
using Company.PunchlinePro.Identity.Services.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Company.PunchlinePro.Identity.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly IMapper _mapper;
        public UserService(ApplicationDbContext applicationDbContext, IMapper mapper)
        {
            _applicationDbContext = applicationDbContext;
            _mapper = mapper;
        }
        public async Task<bool> ActivateUser(string activationToken)
        {
            var userEntity = _applicationDbContext.Users.FirstOrDefault(s => s.ActivationToken == activationToken);

            if (userEntity is null)
            {
                return false;
            }

            if (userEntity.IsActive)
            {
                return false;
            }

            userEntity.IsActive = true;
            userEntity.ActivationToken = String.Empty;
            await _applicationDbContext.SaveChangesAsync();

            return true;
        }

        public async Task<string> Authenticate(string email, string password)
        {
            var userEntity = await _applicationDbContext.Users
            .FirstOrDefaultAsync(s => s.Email == email && s.IsActive);

            if (userEntity == null)
                return string.Empty;

            if (!Cryptography.VerifyHashedPassword(userEntity.Password, password))
            {
                return string.Empty;
            }

            var tokenHandler = new JwtSecurityTokenHandler();

            var jwtSecret = Environment.GetEnvironmentVariable("JWT_SECRET");
            if (jwtSecret is null)
                throw new Exception("Cannot load configuration");
            var key = Encoding.ASCII.GetBytes(jwtSecret);


            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = DateTime.UtcNow.AddDays(8),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Claims = new Dictionary<string, object>(),
                Subject = new ClaimsIdentity()
            };

            tokenDescriptor.Claims.Add(ClaimTypes.Sid, userEntity.Id.ToString());

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);


            return jwtToken;
        }

        public async Task<string> AuthenticateByRefreshToken(string refreshToken)
        {

            var userEntity = await _applicationDbContext.Users
                .FirstOrDefaultAsync(s => s.RefreshToken == refreshToken);

            if (userEntity == null)
                return null;

            var userModel = _mapper.Map<UserModel>(userEntity);

            var tokenHandler = new JwtSecurityTokenHandler();

            var jwtSecret = Environment.GetEnvironmentVariable("JWT_SECRET");
            if (jwtSecret is null)
                throw new Exception("Cannot load configuration");
            var key = Encoding.ASCII.GetBytes(jwtSecret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = DateTime.UtcNow.AddDays(8),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Claims = new Dictionary<string, object>(),
                Subject = new ClaimsIdentity()
            };

            tokenDescriptor.Claims.Add(ClaimTypes.Sid, userEntity.Id.ToString());

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);

            return jwtToken;

        }

        public async Task<int> CreateUser(string email, string name, string password)
        {
            var existingUser = await _applicationDbContext.Users
            .FirstOrDefaultAsync(u => u.Email == email);

            if (existingUser != null)
            {
                return 0;
            }

            var userEntity = new UserEntity()
            {
                Email = email,
                Name = name,
                Password = Cryptography.HashPassword(password),
                ActivationToken = new Faker().Random.AlphaNumeric(32),
            };

            await _applicationDbContext.Users.AddAsync(userEntity);

            await _applicationDbContext.SaveChangesAsync();

            return userEntity.Id;
        }

        public async Task<bool> DeleteUser(int id)
        {
            var user = await _applicationDbContext.Users.FirstOrDefaultAsync(s => s.Id == id);

            if (user is null)
            {
                return false;
            }

            _applicationDbContext.Users.Remove(user);

            await _applicationDbContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DoesUserExistWithThisEmail(string email)
        {
            var user = await _applicationDbContext.Users.FirstOrDefaultAsync(s => s.Email == email);

            if (user is null)
            {
                return false;
            }

            return true;
        }

        public async Task<UserModel?> GetUserByEmail(string email)
        {
            var userEntity = await _applicationDbContext.Users.FirstOrDefaultAsync(s => s.Email == email);

            if (userEntity is null)
            {
                return null;
            }

            var userModel = _mapper.Map<UserModel>(userEntity);

            return userModel;
        }

        public async Task<UserModel?> GetUserById(int id)
        {
            var userEntity = await _applicationDbContext.Users.FirstOrDefaultAsync(s => s.Id == id);

            if (userEntity is null)
            {
                return null;
            }

            var userModel = _mapper.Map<UserModel>(userEntity);

            return userModel;
        }

        public async Task<int> GetUserIdBasedOnValidRefreshToken(string refreshToken)
        {
            var userEntity = await _applicationDbContext.Users.FirstOrDefaultAsync(s => s.RefreshToken == refreshToken && DateTime.Compare(s.RefreshExpiration, DateTime.UtcNow) > 0);

            if (userEntity is null)
            {
                return 0;
            }

            return userEntity.Id;
        }

        public async Task<string> ResetPasswordByEmail(string email)
        {
            var randomPassword = new Faker().Random.AlphaNumeric(125);
            var hashedRandomPassword = Cryptography.HashPassword(randomPassword);
            var randomResetPasswordToken = new Faker().Random.AlphaNumeric(125);

            var userEntity = await _applicationDbContext.Users.FirstOrDefaultAsync(s => s.Email == email);

            if (userEntity is null)
            {
                return String.Empty;
            }

            userEntity.Password = hashedRandomPassword;
            userEntity.ResetPasswordToken = randomResetPasswordToken;
            _applicationDbContext.Users.Update(userEntity);
            await _applicationDbContext.SaveChangesAsync();
            return randomResetPasswordToken;
        }

        public async Task ResetPasswordByToken(string password, string passwordResetToken)
        {
            var user = await _applicationDbContext.Users.FirstOrDefaultAsync(s => s.ResetPasswordToken == passwordResetToken);

            if (user is null)
            {
                return;
            }

            user.ResetPasswordToken = String.Empty;
            user.Password = Cryptography.HashPassword(password); ;

            await _applicationDbContext.SaveChangesAsync();
        }

    }
}
