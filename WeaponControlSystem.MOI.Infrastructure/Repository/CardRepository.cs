using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.Domain.Entities;
using WeaponControlSystem.MOI.Core.Domain.RepositoryContracts;
using WeaponControlSystem.MOI.Infrastructure.dbContext;
using WeaponControlSystem.MOI.Infrastructure.Repository.Base;

namespace WeaponControlSystem.MOI.Infrastructure.Repository
{
    public  class CardRepository :GenericRepository<Card>, ICardRepository
    {
        private readonly AppDbContext _dbContext;
        public CardRepository(AppDbContext dbContext):base(dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
