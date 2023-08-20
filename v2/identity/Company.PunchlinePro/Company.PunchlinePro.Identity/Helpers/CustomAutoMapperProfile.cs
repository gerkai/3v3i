using AutoMapper;
using Company.PunchlinePro.Identity.Infrastructure.Entities;
using Company.PunchlinePro.Identity.Services.Models;

namespace Company.PunchlinePro.Identity.Helpers
{
    public class CustomAutoMapperProfile: Profile
    {
        public CustomAutoMapperProfile()
        {
            CreateMap<UserEntity, UserModel>().ReverseMap();
        }
    }
}
