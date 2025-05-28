using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WeaponControlSystem.MOI.Core.Domain.Entities
{    
    public class WeaponHandover
    {   public int id { get; set; } // PK
        public string name { get; set; }
        public string Type { get; set; }
        public DateTime InDate { get; set; }
        public DateTime? OutDate { get; set; }
        public string OfficerName { get; set; }   
        public string InBy { get; set; } // Name of the user who took the weapon
        public string? OutBy { get; set; } 

    }
}
