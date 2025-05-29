using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.Domain.RepositoryContracts.Base;
using WeaponControlSystem.MOI.Core.Domain.Entities;
namespace WeaponControlSystem.MOI.Core.Domain.RepositoryContracts
{
    public  interface ICardRepository:IGenericRepository<Card>
    {
        public Task<int> Count();
    }
}
