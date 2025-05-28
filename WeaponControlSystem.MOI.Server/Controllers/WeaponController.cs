using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.DTOs.weapon;
using WeaponControlSystem.MOI.Core.ServiceContracts;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WeaponControlSystem.MOI.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeaponController : ControllerBase
    {   private readonly IWeaponService _weaponService;
        public WeaponController(IWeaponService weaponService)
        {
            _weaponService = weaponService;
        }
        // GET: api/<WeaponController>
        [HttpGet]
        public async Task<IEnumerable<WeaponResponseDTo>> Get()
        {
            return await _weaponService.GetWeaponList();
        }

        // GET api/<WeaponController>/5
        [HttpGet("{id}")]
        public async Task<WeaponResponseDTo> Get(int id)
        {
            return await _weaponService.GetWeaponById(id);
        }

        // POST api/<WeaponController>
        [HttpPost]
        public async Task<WeaponAddDTo> Post(WeaponAddDTo weaponAddDTo)
        {
            return await _weaponService.AddWeapon(weaponAddDTo);
        }

        [HttpPut("{id}")]
        public async Task<WeaponResponseDTo> Update(int id, [FromBody] WeaponAddDTo weaponAddDTo)
        {    
                if(id>0&& weaponAddDTo != null)
            {
                  return await _weaponService.UpdateWeapon(id, weaponAddDTo);
            }
            return null;
             
        }

        // DELETE api/<WeaponController>/5
        [HttpDelete("{id}")]
        public async Task<WeaponResponseDTo> Delete(int id)
        {
            return await _weaponService.DeleteWeapon(id);
        }

        [HttpGet("byOfficer/{officerId}")]
        public async Task<IEnumerable<WeaponResponseDTo>> GetByOfficerId(int officerId) {
           
            return await _weaponService.GetByOfficerId(officerId);
        
        }

    }
}
