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
        public DateTime InDate { get; set; }
        public DateTime? OutDate { get; set; }
        public string OfficerBadgeNo { get; set; } // FK to Officer's BadgeNo

        public Weapon toWeapon()
        {
            return new Weapon
            {
                Name = Name,
                Type = Type,
                InDate = InDate,
                OutDate = OutDate,
                OfficerBadgeNo = OfficerBadgeNo
            };
        }
    }
}
