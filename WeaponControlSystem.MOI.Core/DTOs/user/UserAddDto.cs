using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.Domain.Entities;
namespace WeaponControlSystem.MOI.Core.DTOs.user
{
    public  class UserAddDto
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Gate { get; set; }
        public string Password { get; set; }
        public ApplicationUser ToUser()
        {    
            return new ApplicationUser
            {
                Name = Name,
                LastName = LastName,
                PhoneNumber = Phone,
                Email = Email,
                Gate = Gate,
             
            };
        }
    }
}
