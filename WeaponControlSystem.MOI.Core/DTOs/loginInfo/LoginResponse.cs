using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WeaponControlSystem.MOI.Core.DTOs.loginInfo
{
    public class LoginResponse
    {
        public string Username { get; set; }
        public string AccessToken { get; set; }
        public int ExpiresIn { get; set; }
    }
}
