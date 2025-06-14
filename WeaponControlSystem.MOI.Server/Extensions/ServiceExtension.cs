// src/WeaponControlSystem.MOI.Server/Extensions/ServiceExtensions.cs
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using WeaponControlSystem.MOI.Core.Domain.Entities;
using WeaponControlSystem.MOI.Core.Domain.RepositoryContracts.Base;
using WeaponControlSystem.MOI.Core.ServiceContracts;
using WeaponControlSystem.MOI.Core.Services;
using WeaponControlSystem.MOI.Infrastructure.dbContext;
using WeaponControlSystem.MOI.Infrastructure.Repository.Base;

namespace WeaponControlSystem.MOI.Server.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureServices(this IServiceCollection services, IConfiguration configuration)
        {
            
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IWeaponService, WeaponService>();
            services.AddScoped<IWeaponHandoverService, WeaponHandoverService>();
            services.AddScoped<IOfficerService, OfficerService>();
            services.AddScoped<ICardService, CardService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    policy => policy
                        .WithOrigins("https://localhost:50908")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });
            services.AddIdentity<ApplicationUser, ApplicationRole>()
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders()
            ;
            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 4;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
            });


            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
       .AddJwtBearer(options =>
       {
           options.TokenValidationParameters = new TokenValidationParameters
           {
               ValidateIssuer = true,
               ValidateAudience = true,
               ValidateLifetime = true,
               ValidateIssuerSigningKey = true,
               ValidIssuer = configuration["Jwt:Issuer"],
               ValidAudience = configuration["Jwt:Audience"],
               IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:SecretKey"])),
               RoleClaimType = ClaimTypes.Role,
           };
       });


            services.AddAuthorization();


            services.AddControllers();

            
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

          
        }
    }
}
