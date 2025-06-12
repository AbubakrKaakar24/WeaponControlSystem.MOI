using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.Domain.Entities;
using WeaponControlSystem.MOI.Core.Domain.RepositoryContracts.Base;
namespace WeaponControlSystem.MOI.Core.Domain.RepositoryContracts
{
    public interface IUserRepository : IGenericRepository<ApplicationUser>
    {  
      public Task<ApplicationUser> GetUserByName(string name);
    }
}
