using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.Domain.Entities;
namespace WeaponControlSystem.MOI.Core.DTOs.weaponHandover
{
    public class WeaponHandoverResponseDTo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string SerialNo { get; set; }
        public DateTime InDate { get; set; }
        public DateTime? OutDate { get; set; }
        public string OfficerName { get; set; }
        public string InBy { get; set; } // Name of the user who took the weapon
        public string? OutBy { get; set; }

    }

    public static class WeaponHandoverExtensions
    {
        public static WeaponHandoverResponseDTo ToWeaponHandoverResponseDTo(this WeaponHandover weaponHandover)
        {
            return new WeaponHandoverResponseDTo
            {
                Id = weaponHandover.id,
                Name = weaponHandover.name,
                Type = weaponHandover.Type,
                SerialNo= weaponHandover.SerialNo,
                InDate = weaponHandover.InDate,
                OutDate = weaponHandover.OutDate,
                OfficerName = weaponHandover.OfficerName,
                InBy = weaponHandover.InBy,
                OutBy = weaponHandover.OutBy,
            };
        }
    }
}