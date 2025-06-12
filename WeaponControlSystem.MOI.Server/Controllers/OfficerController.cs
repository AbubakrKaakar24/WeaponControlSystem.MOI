using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.DTOs.officer;
using WeaponControlSystem.MOI.Core.ServiceContracts;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WeaponControlSystem.MOI.Server.Controllers
{    
    [Route("api/[controller]")]
    [ApiController]
    public class OfficerController : ControllerBase
    {
        // GET: api/<OfficerController>
        private readonly IOfficerService _officerService;
        public OfficerController(IOfficerService officerService)
        {
            _officerService = officerService;
        }
        [HttpGet]
        public async Task<IEnumerable<OfficerResponseDTo>> Get()
        {  
            return await _officerService.GetOfficerList();

        }

        // GET api/<OfficerController>/5
        [HttpGet("by-Id/{id}")]
        public async Task<OfficerResponseDTo> GetById(int id)
        {
           return await _officerService.GetOfficerById(id);
        }
        [HttpGet("by-Phone/{phoneNo}")]
        public async Task<OfficerResponseDTo> GetBYPhone(string phoneNo)
        {
            return await _officerService.GetOfficerByPhone(phoneNo);
        }

        // POST api/<OfficerController>
        [HttpPost]
        public async Task<OfficerAddDTo> Post(OfficerAddDTo officerAddDTo)
        {
            return await _officerService.AddOfficer(officerAddDTo);
        }

        [HttpPut("{id}")]

        public async Task<OfficerResponseDTo> Update(int id, OfficerAddDTo officerAddDTo) {

            if (id != 0 && officerAddDTo != null) {
            
               return await _officerService.UpdateOfficer(id, officerAddDTo);
            }

            throw new Exception("Either id or officer is empty!");
        
        }

        // DELETE api/<OfficerController>/5
        [HttpDelete("{id}")]
        public async Task<OfficerResponseDTo> Delete(int id)
        {   
            return await _officerService.DeleteOfficer(id);
        }
    }
}
