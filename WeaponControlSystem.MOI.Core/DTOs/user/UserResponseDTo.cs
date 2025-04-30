using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.Domain.Entities;
namespace WeaponControlSystem.MOI.Core.DTOs.user
{
    public  class UserResponseDTo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string Gate { get; set; }
    }
    public static class UserExtensions
    {
        public static UserResponseDTo ToUserResponseDTo(this User user)
        {
            return new UserResponseDTo
            {
                Id = user.Id,
                Name = user.Name,
                LastName = user.LastName,
                Phone = user.Phone,
                Email = user.Email,
                Role = user.Role,
                Gate = user.Gate
            };
        }
    }
}
