using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Infrastructure.Repository.Base;
using WeaponControlSystem.MOI.Core.Domain.Entities;
using WeaponControlSystem.MOI.Core.Domain.RepositoryContracts;
using WeaponControlSystem.MOI.Infrastructure.dbContext;
namespace WeaponControlSystem.MOI.Infrastructure.Repository
{
    public  class WeaponRepository: GenericRepository<Weapon>, IWeaponRepository
    {
        private readonly AppDbContext _dbContext;
        public WeaponRepository(AppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }
    }
    
}
