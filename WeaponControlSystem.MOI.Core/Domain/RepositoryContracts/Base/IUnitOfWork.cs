using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.Domain.RepositoryContracts;
namespace WeaponControlSystem.MOI.Core.Domain.RepositoryContracts.Base
{
    public interface IUnitOfWork
    {
        IUserRepository User { get; }
        IWeaponHandoverRepository WeaponHandover { get; }
        IWeaponRepository Weapon { get; }
        IOfficerRepository Officer { get; }

        Task SaveChanges(CancellationToken cancellationToken);
        
    }
}
