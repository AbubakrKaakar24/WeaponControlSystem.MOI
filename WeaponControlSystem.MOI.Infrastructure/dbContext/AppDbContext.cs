using Microsoft.EntityFrameworkCore;
using WeaponControlSystem.MOI.Core.Domain.Entities;
namespace WeaponControlSystem.MOI.Infrastructure.dbContext
{
    public class AppDbContext : DbContext
    {


        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<WeaponHandover> WeaponHandovers { get; set; }
        public DbSet<Weapon> Weapons { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Officer> Officers { get; set; }
        public DbSet<Card> Cards { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure your entities here
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Officer>()
            .HasIndex(o => o.BadgeNo)
             .IsUnique();
            modelBuilder.Entity<Card>().HasIndex(C => C.CardNo).IsUnique();



            modelBuilder.Entity<User>()
        .HasIndex(u => new { u.Name, u.LastName })
        .IsUnique();

            modelBuilder.Entity<User>()
    .Property(u => u.Name)
    .HasMaxLength(100);

            modelBuilder.Entity<User>()
                .Property(u => u.LastName)
                .HasMaxLength(100);


        }

    }
}
