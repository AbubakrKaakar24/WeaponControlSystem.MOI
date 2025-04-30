using Microsoft.EntityFrameworkCore;
using WeaponControlSystem.MOI.Core.Domain.Entities;
namespace WeaponControlSystem.MOI.Infrastructure.dbContext
{
    public class AppDbContext : DbContext
    {


        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer("Data Source=(localdb)\\ProjectModels;Initial Catalog=WeaponDatabase;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");
        //}
        public DbSet<WeaponHandover> WeaponHandovers { get; set; }
        public DbSet<Weapon> Weapons { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Officer> Officers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure your entities here
            base.OnModelCreating(modelBuilder);
        }
    }
}
