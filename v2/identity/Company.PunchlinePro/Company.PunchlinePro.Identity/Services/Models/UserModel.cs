﻿namespace Company.PunchlinePro.Identity.Services.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
        public bool IsActive { get; set; }
        public string ActivationToken { get; set; }
    }
}
