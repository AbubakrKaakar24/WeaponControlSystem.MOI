using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.Domain.Entities;
namespace WeaponControlSystem.MOI.Core.DTOs.weaponHandover
{
    public  class WeaponHandoverAddDTo
    {
        public string name { get; set; }
        public string Type { get; set; }
        public DateTime InDate { get; set; }
        public DateTime? OutDate { get; set; }
        public string OfficerBadgeNo { get; set; } // FK to Officer's BadgeNo


        public WeaponHandover toWeaponHandover()
        {
            return new WeaponHandover
            {
                name = name,
                Type = Type,
                InDate = InDate,
                OutDate = OutDate,
                OfficerBadgeNo = OfficerBadgeNo
            };
        }
    }
}
