using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.Domain.Entities;
using WeaponControlSystem.MOI.Core.DTOs.officer;
namespace WeaponControlSystem.MOI.Core.ServiceContracts
{
    public interface IOfficerService
    {
        public Task<int> AddOfficer(OfficerAddDTo officerAddDTo);
        public Task<OfficerResponseDTo> GetOfficerById(int? officerId);

        public Task<IEnumerable<OfficerResponseDTo>> GetOfficerList();

        public Task<OfficerResponseDTo> UpdateOfficer(int id, OfficerAddDTo officerDTo);

        public Task<OfficerResponseDTo> DeleteOfficer(int? officerId);

        public Task<OfficerResponseDTo> GetOfficerByPhone(string phoneNo);

    }
}
