using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WeaponControlSystem.MOI.Infrastructure.dbContext;

[ApiController]
[Route("[controller]")]
public class TestController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public TestController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("dbtest")]
    public async Task<IActionResult> DbTest()
    {
        try
        {
            await _dbContext.Database.OpenConnectionAsync();
            await _dbContext.Database.CloseConnectionAsync();
            return Ok("Database connection successful");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"DB Connection failed: {ex.Message}");
        }
    }
}
