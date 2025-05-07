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
        public DateTime InDate { get; set; }
        public DateTime? OutDate { get; set; }
        public string OfficerBadgeNo { get; set; } // FK to Officer's BadgeNo
        public string CardNo { get; set; }

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
                InDate = weapon.InDate,
                OutDate = weapon.OutDate,
                OfficerBadgeNo = weapon.OfficerBadgeNo,
                CardNo = weapon.CardNo

            };
        }
    }
}
