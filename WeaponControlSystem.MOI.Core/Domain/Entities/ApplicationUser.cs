﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
namespace WeaponControlSystem.MOI.Core.Domain.Entities
{
    public class ApplicationUser:IdentityUser
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Gate { get; set; }

    }

}
