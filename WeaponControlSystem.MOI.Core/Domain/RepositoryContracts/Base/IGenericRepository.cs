using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace WeaponControlSystem.MOI.Core.Domain.RepositoryContracts.Base
{
    public interface IGenericRepository<T>
    {


        Task<T?> GetFirstOrDefault(Expression<Func<T, bool>> filter, string? includeProperties = null, bool tracked = true);
        Task<T?> GetById(int Id);
        Task<IList<T>> GetAll(Expression<Func<T, bool>>? filter = null, string? includeProperties = null);

        Task Add(T entity);

        Task Update(T entity);

        Task Remove(T entity);

    }
}
