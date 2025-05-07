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
      public  string OfficerBadgeNo { get; set; } // FK to Officer's BadgeNo

        // Navigation property (optional)
        public Officer Officer { get; set; }





    }
}
