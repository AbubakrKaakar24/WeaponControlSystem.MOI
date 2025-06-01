using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.Domain.Entities;
namespace WeaponControlSystem.MOI.Core.DTOs.weapon
{    
    public  class WeaponResponseDTo
    {   
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string SerialNo { get; set; }
        public bool In { get; set; } // Indicates if the weapon is in or out
        public int? OfficerID { get; set; } // FK to Officer's BadgeNo

    }
    public static class WeaponExtensions
    {
        public static WeaponResponseDTo ToWeaponResponseDTo(this Weapon weapon)
        {
            return new WeaponResponseDTo
            {
                Id = weapon.Id,
                Name = weapon.Name,
                Type = weapon.Type,
                SerialNo = weapon.SerialNo,
                OfficerID = weapon.OfficerId,
                In = weapon.In,
            };
        }
    }
}
