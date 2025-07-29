using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WeaponControlSystem.MOI.Core.Common.Response
{
    public class ValidationError
    {
        public string? Code { get; set; }
        public string? Property { get; set; }
        public string? Description { get; set; }

        public override string ToString()
        {
            return $"Code:{Code}, Property:{Property}, Description:{Description}";
        }
    }
}
