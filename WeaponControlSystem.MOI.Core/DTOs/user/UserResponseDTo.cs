using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.Domain.Entities;
namespace WeaponControlSystem.MOI.Core.DTOs.user
{
    public  class UserResponseDTo
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string Gate { get; set; }
    }
    public static class UserExtensions
    {
        public static UserResponseDTo ToUserResponseDTo(this ApplicationUser user)
        {
            return new UserResponseDTo
            {
                Id = user.Id,
                Name = user.Name,
                LastName = user.LastName,
                Phone = user.PhoneNumber,
                Email = user.Email,
                Gate = user.Gate,
               
            };
        }
    }
}
