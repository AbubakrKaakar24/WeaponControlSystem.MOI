using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.DTOs.weaponHandover;
using WeaponControlSystem.MOI.Core.ServiceContracts;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WeaponControlSystem.MOI.Server.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class WeaponHandoverController : ControllerBase
    {
         private readonly IWeaponHandoverService _weaponHandoverService;
        public WeaponHandoverController(IWeaponHandoverService weaponHandoverService) { 
        _weaponHandoverService = weaponHandoverService;
        }
        // GET: api/<WeaponHandoverController>
        [HttpGet]
        public async Task<IEnumerable<WeaponHandoverResponseDTo>> Get()
        {
            return await _weaponHandoverService.GetWeaponHandoverList();
        }

        // GET api/<WeaponHandoverController>/5
        [HttpGet("{id}")]
        public async Task<WeaponHandoverResponseDTo> Get(int id)
        {
            return await _weaponHandoverService.GetWeaponHandoverById(id);
        }

        // POST api/<WeaponHandoverController>
        [HttpPost]
        public async Task<WeaponHandoverAddDTo> Post(WeaponHandoverAddDTo weaponHandoverAddDTo)
        {
            return await _weaponHandoverService.AddWeaponHandover(weaponHandoverAddDTo);

        }

        // DELETE api/<WeaponHandoverController>/5
        [HttpDelete("{id}")]
        public async Task<WeaponHandoverResponseDTo> Delete(int id)
        {
            return await _weaponHandoverService.DeleteWeaponHandover(id);
        }
    }
}
