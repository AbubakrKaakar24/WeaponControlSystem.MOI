using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WeaponControlSystem.MOI.Core.ServiceContracts;
using Microsoft.AspNetCore.Identity;
using WeaponControlSystem.MOI.Core.Domain.Entities;

namespace WeaponControlSystem.MOI.Core.Services
{
    public class TokenService:ITokenService
    {
        private readonly IConfiguration _config;
        private readonly UserManager<ApplicationUser> _userManager;

        public TokenService(IConfiguration config, UserManager<ApplicationUser> userManager)
        {
            _config = config;
            _userManager = userManager;
        }
        public async Task<string> GenerateToken(string email)
        {   var user= await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return null;

            }
            var roles= await _userManager.GetRolesAsync(user);
            var roleClaims= roles.Select(r => new Claim(ClaimTypes.Role, r)).ToList();
        var claims= new List<Claim>
        { new Claim(JwtRegisteredClaimNames.Sub,user.Email!),
          new Claim(ClaimTypes.NameIdentifier,user.Id),
          new Claim(ClaimTypes.Name,user.UserName!),
        };
            claims.AddRange(roleClaims);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiry = DateTime.UtcNow.AddMinutes(60);
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: expiry,
                signingCredentials: creds
            );


            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    
    }
}
