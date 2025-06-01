using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WeaponControlSystem.MOI.Core.ServiceContracts
{
    public interface ITokenService
    {
        string GenerateToken(string username);
    }
}
