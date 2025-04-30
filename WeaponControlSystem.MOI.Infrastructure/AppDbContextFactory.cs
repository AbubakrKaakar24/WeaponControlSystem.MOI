using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using WeaponControlSystem.MOI.Infrastructure.dbContext;

namespace WeaponControlSystem.MOI.Infrastructure
{
    public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
            optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=WeaponDatabase;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");

            return new AppDbContext(optionsBuilder.Options);
        }
    }
}
