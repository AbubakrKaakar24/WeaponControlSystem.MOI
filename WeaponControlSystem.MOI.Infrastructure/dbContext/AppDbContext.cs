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
            modelBuilder.Entity<Officer>()
            .HasIndex(o => o.BadgeNo)
             .IsUnique();
            modelBuilder.Entity<Weapon>()
    .HasOne(w => w.Officer)
    .WithMany(o => o.Weapons)
    .HasForeignKey(w => w.OfficerBadgeNo)
    .HasPrincipalKey(o => o.BadgeNo); // Important: tells EF to match FK to BadgeNo

            modelBuilder.Entity<WeaponHandover>()
    .HasOne(wh => wh.Officer)
    .WithMany(o => o.WeaponHandovers)
    .HasForeignKey(wh => wh.OfficerBadgeNo)
    .HasPrincipalKey(o => o.BadgeNo);
        }
    }
}
