using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.Domain.Entities;
namespace WeaponControlSystem.MOI.Core.DTOs.officer
{
    public class OfficerAddDTo
    {
        public string Name { get; set; }
        public string Base { get; set; } // Base where the officer is stationed
        public string Moeenyat { get; set; } // Moeenyat where the officer is stationed
        public string Directorate { get; set; } // Directorate where the officer is stationed
        public string Administration { get; set; } // Administration where the officer is stationed
        public string BadgeNo { get; set; }
        public Officer toOfficer()
        {
            return new Officer
            {
                Name = Name,
                Base = Base,
                Moeenyat = Moeenyat,
                Directorate = Directorate,
                Administration = Administration,
                BadgeNo = BadgeNo
            };
        }
    }
}
