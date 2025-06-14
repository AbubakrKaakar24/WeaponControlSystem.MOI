using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WeaponControlSystem.MOI.Core.Domain.Entities;
using WeaponControlSystem.MOI.Core.DTOs.loginInfo;
using WeaponControlSystem.MOI.Core.DTOs.user;
using WeaponControlSystem.MOI.Core.ServiceContracts;
using WeaponControlSystem.MOI.Infrastructure.dbContext;

namespace WeaponControlSystem.MOI.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
       
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;
        public UsersController(IUserService userService, ITokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }

        // GET: api/Users
       [Authorize(Roles ="Admin")]
        [HttpGet]
        public async Task<IEnumerable<UserResponseDTo>> GetUsers()
        {
            return await _userService.GetUserList();
        }


        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login(LoginInfo info)
        {
            if (info == null)
            {
                Console.WriteLine("LoginInfo is null. Check request body format.");
                return BadRequest("Invalid login request.");
            }
            var user = await _userService.Auth(info);
            if (user)
            {
                var token =await _tokenService.GenerateToken(info.Email);
                var response = new LoginResponse
                {
                    Username = info.Email,
                    AccessToken = token,
                    ExpiresIn = 3600 // 1 hour in seconds
                };
                return Ok(response);

            }
            else
            {
                return Unauthorized();
            }

        }


        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<UserAddDto>> PostUser(UserAddDto user)
        {
            await _userService.AddUser(user);

            return user;
        }

        // DELETE: api/Users/5
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            await _userService.DeleteUser(id);

            return NoContent();
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(string id, [FromBody] UserAddDto user)
        {
         
            UserResponseDTo user2=   await _userService.UpdateUser(id,user);
               
                if (user2==null)
                {
                    return NotFound();
                }
                
                else {
                return Ok(user2);
            }
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("getByName/{name}")]
        public async Task<ActionResult<UserResponseDTo>> GetUserByName(string name)
        {
            var user = await _userService.getUserByName(name);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // GET: api/Users/5
        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<UserResponseDTo>> GetUser(string id)
        {
            

            return await _userService.GetUserById(id);
        }
    }
}
