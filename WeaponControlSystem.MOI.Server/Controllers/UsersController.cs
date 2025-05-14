using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
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
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<IEnumerable<UserResponseDTo>> GetUsers()
        {
            return await _userService.GetUserList();
        }


        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginInfo info)
        {
            if (info == null)
            {
                Console.WriteLine("LoginInfo is null. Check request body format.");
                return BadRequest("Invalid login request.");
            }
            var user = await _userService.Auth(info);
            if (user)
            {
                return Ok();
            }
            else
            {
                return Unauthorized();
            }

        }


        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserAddDto>> PostUser(UserAddDto user)
        {
            await _userService.AddUser(user);

            return user;
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            await _userService.DeleteUser(id);

            return NoContent();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, [FromBody] UserAddDto user)
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
        [HttpGet("{id}")]
        public async Task<ActionResult<UserResponseDTo>> GetUser(int id)
        {
            

            return await _userService.GetUserById(id);
        }



    //    private string GenerateJwtToken(string username)
    //    {
    //        var claims = new[]
    //        {
    //    new Claim(ClaimTypes.Name, username),
    //    // Add more claims as needed
    //};

    //        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
    //        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    //        var token = new JwtSecurityToken(
    //            issuer: _config["Jwt:Issuer"],
    //            audience: _config["Jwt:Audience"],
    //            claims: claims,
    //            expires: DateTime.Now.AddHours(2),
    //            signingCredentials: creds);

    //        return new JwtSecurityTokenHandler().WriteToken(token);
    //    }

    }
}
