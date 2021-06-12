using System.Linq;
using api.DTOs;
using api.Entities;
using api.Extensions;
using AutoMapper;

namespace api.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
          CreateMap<Words,GetWordsDto>();
          CreateMap<Words,onlyWordsDto>();
        }

    }
}