using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Infrastructure.Repository.Base;
using WeaponControlSystem.MOI.Core.Domain.Entities;
using WeaponControlSystem.MOI.Core.Domain.RepositoryContracts;
using WeaponControlSystem.MOI.Infrastructure.dbContext;
using Microsoft.EntityFrameworkCore;
namespace WeaponControlSystem.MOI.Infrastructure.Repository
{
    public class UserRepository:GenericRepository<ApplicationUser>,IUserRepository
    {
        private readonly AppDbContext _dbContext;
        public UserRepository(AppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ApplicationUser> GetUserByName(string name)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Name == name);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            return user;
        }




    }
}
