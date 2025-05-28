using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.Domain.Entities;
namespace WeaponControlSystem.MOI.Core.DTOs.weapon
{
    public  class WeaponAddDTo
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string SerialNo { get; set; }
        public bool In { get; set; } // Indicates if the weapon is in or out
        public int OfficerID { get; set; } // FK to Officer's BadgeNo
        public Weapon toWeapon()
        {
            return new Weapon
            {
                Name = Name,
                Type = Type,
                SerialNo= SerialNo,
                OfficerId = OfficerID,
                In = In

            };
        }
    }
}
