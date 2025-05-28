using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.Domain.RepositoryContracts;
using WeaponControlSystem.MOI.Core.Domain.RepositoryContracts.Base;
using WeaponControlSystem.MOI.Infrastructure.dbContext;
namespace WeaponControlSystem.MOI.Infrastructure.Repository.Base
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _dbContext;
        public UnitOfWork(AppDbContext dbContext)
        {
            _dbContext = dbContext;
            User = new UserRepository(_dbContext);
            Weapon = new WeaponRepository(_dbContext);
            Officer = new OfficerRepository(_dbContext);
            WeaponHandover = new WeaponHandoverRepository(_dbContext);
            Card = new CardRepository(_dbContext);

        }
      
        public IUserRepository User { get; private set; }

        public IWeaponHandoverRepository WeaponHandover { get; private set; }

        public IWeaponRepository Weapon { get; private set; }

        public IOfficerRepository Officer { get; private set; }

        public ICardRepository Card { get; private set; }

        public async Task SaveChanges(CancellationToken cancellationToken)
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
