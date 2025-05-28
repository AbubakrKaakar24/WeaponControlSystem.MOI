using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WeaponControlSystem.MOI.Core.Domain.Entities
{
    public class Weapon
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string SerialNo { get; set; }
        public bool In { get; set; } // Indicates if the weapon is in or out
        public int? OfficerId { get; set; }
        public Officer Officer { get; set; }
    }


}
