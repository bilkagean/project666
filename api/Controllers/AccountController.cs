using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using api.DTOs;
using api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    //for login and logout or register
    public class AccountController : BaseApiController
    {
        private readonly Data.DataContext _context;
        private readonly Interfaces.ITokenService _tokenService;

        public AccountController(Data.DataContext context, Interfaces.ITokenService tokenService)
        {
            _tokenService = tokenService;

            _context = context;
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDTO registerDTO)
        {
            if (await UserExists(registerDTO.Username)) return BadRequest("Username is taken");
            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = registerDTO.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
                PasswordSalt = hmac.Key,
                Created = DateTime.Now
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

           
            return new UserDto{

                Username= user.UserName,
                Token= _tokenService.CreateToken(user),
                Id = user.Id
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDTO loginDTO)
        {
            
            var user = await _context.Users
            .SingleOrDefaultAsync(x => x.UserName == loginDTO.Username);

            if (user == null) return Unauthorized("Invalid username");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }


            return new UserDto{

                Username= user.UserName,
                Token= _tokenService.CreateToken(user),
                Id = user.Id
            };


        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}