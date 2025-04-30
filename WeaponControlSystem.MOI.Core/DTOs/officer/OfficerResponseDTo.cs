using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.Domain.Entities;

namespace WeaponControlSystem.MOI.Core.DTOs.officer
{
    public class OfficerResponseDTo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Base { get; set; } // Base where the officer is stationed
        public string Moeenyat { get; set; } // Moeenyat where the officer is stationed
        public string Directorate { get; set; } // Directorate where the officer is stationed
        public string Administration { get; set; } // Administration where the officer is stationed
        public string BadgeNo { get; set; }
    }
    public static class OfficerExtensions
    {
        public static OfficerResponseDTo ToOfficerResponseDTo(this Officer officer)
        {
            return new OfficerResponseDTo
            {
                Id = officer.Id,
                Name = officer.Name,
                Base = officer.Base,
                Moeenyat = officer.Moeenyat,
                Directorate = officer.Directorate,
                Administration = officer.Administration,
                BadgeNo = officer.BadgeNo
            };
        }
    }
}
