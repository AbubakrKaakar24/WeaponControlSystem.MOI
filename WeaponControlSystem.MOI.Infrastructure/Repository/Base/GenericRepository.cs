using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.Domain.RepositoryContracts.Base;
using WeaponControlSystem.MOI.Infrastructure.dbContext;
namespace WeaponControlSystem.MOI.Infrastructure.Repository.Base
{
    public class GenericRepository<T>: IGenericRepository<T> where T : class
    {
        private readonly AppDbContext _dbContext;
        private readonly DbSet<T> dbSet;

        public GenericRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
            this.dbSet = _dbContext.Set<T>();
        }

        public async Task Add(T entity)
        {
            await dbSet.AddAsync(entity);
        }
        public async Task Update(T entity)
        {
             dbSet.Update(entity);
        }


        public Task Remove(T entity)
        {
            dbSet.Remove(entity);
            return Task.CompletedTask;
        }
        public async Task<IList<T>> GetAll(Expression<Func<T, bool>>? filter = null, string? includeProperties = null)
        {
            IQueryable<T> query = dbSet;
            if (filter != null)// If requested records are based on a condation, then this block will execute.
            {
                query = query.Where(filter);
            }
            if (includeProperties != null)
            {
                foreach (var includeProp in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProp);
                }
            }
            return await query.ToListAsync();
        }


        public async Task<T?> GetFirstOrDefault(Expression<Func<T, bool>> filter, string? includeProperties = null, bool tracked = true)
        {

            IQueryable<T> query;

            if (tracked)
            {
                query = dbSet;
                //this us comment
            }
            else
            {
                query = dbSet.AsNoTracking();
            }

            query = query.Where(filter);
            if (includeProperties != null)
            {
                foreach (var includeProp in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProp);
                }
            }

            var result = await query.FirstOrDefaultAsync();
            if (result == null)
            {
                return null;
            }

            return result;
        }

        public async Task<T?> GetById(int Id)
        {
            return await dbSet.FindAsync(Id);

        }

        
    }


}
