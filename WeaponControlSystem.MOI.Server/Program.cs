using System;
using Microsoft.EntityFrameworkCore;
using WeaponControlSystem.MOI.Infrastructure.dbContext;
using WeaponControlSystem.MOI.Server.Extensions;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.ConfigureServices(builder.Configuration);
//builder.WebHost.UseUrls("http://*:80");
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
Console.WriteLine($"Connection string in use: {connectionString}");
var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
    app.UseSwagger();
    app.UseSwaggerUI();

//app.UseSwagger();
//app.UseSwaggerUI();

app.UseCors("AllowReactApp");
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}


app.Run();
