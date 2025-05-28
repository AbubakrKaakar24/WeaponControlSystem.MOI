using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.DTOs.officer;
using WeaponControlSystem.MOI.Core.ServiceContracts;
using WeaponControlSystem.MOI.Core.Domain.RepositoryContracts.Base;
namespace WeaponControlSystem.MOI.Core.Services
{
    public class OfficerService : IOfficerService
    {
        private readonly IUnitOfWork _unitOfWork;
        public OfficerService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<OfficerAddDTo> AddOfficer(OfficerAddDTo officerAddDTo)
        {
          await  _unitOfWork.Officer.Add(officerAddDTo.toOfficer());
            await _unitOfWork.SaveChanges(CancellationToken.None);
            return officerAddDTo;
        }

        public async Task<OfficerResponseDTo> DeleteOfficer(int? officerId)
        {
            var officer = await _unitOfWork.Officer.GetById(officerId.Value);
            if (officer == null)
            {
                return null;
            }
            await _unitOfWork.Officer.Remove(officer);
            await _unitOfWork.SaveChanges(CancellationToken.None);
            return officer.ToOfficerResponseDTo();

        }

        public async Task<OfficerResponseDTo> GetOfficerById(int? officerId)
        {
          var officer= await _unitOfWork.Officer.GetById(officerId.Value);
            if (officer == null)
            {
                return null;
            }
            return officer.ToOfficerResponseDTo();
        }

        public async Task<OfficerResponseDTo> GetOfficerByPhone(string phoneNo)
        {
            var officer=await _unitOfWork.Officer.GetFirstOrDefault(x => x.PhoneNo == phoneNo);
            return officer?.ToOfficerResponseDTo() ?? throw new Exception("Officer not found with the provided phone number.");
        }

        public async Task<IEnumerable<OfficerResponseDTo>> GetOfficerList()
        {
           var officers= await _unitOfWork.Officer.GetAll();
            return officers.Select(x => x.ToOfficerResponseDTo());
        }


        public async Task<OfficerResponseDTo> UpdateOfficer(int id, OfficerAddDTo officerDTo)
        {
            var officertoUpdate= await _unitOfWork.Officer.GetFirstOrDefault(o => o.Id==id);
            if (officertoUpdate == null)
                throw new Exception("User not found"); ;

            officertoUpdate.Name = officerDTo.Name;
            officertoUpdate.BadgeNo = officerDTo.BadgeNo;
            officertoUpdate.Base = officerDTo.Base;
            officertoUpdate.Administration = officerDTo.Administration;
            officertoUpdate.Directorate = officerDTo.Directorate;
            officertoUpdate.Deputy_Ministry = officerDTo.Deputy_Ministry;
            officertoUpdate.PhoneNo = officerDTo.PhoneNo;
           await _unitOfWork.Officer.Update(officertoUpdate);
            await _unitOfWork.SaveChanges(CancellationToken.None);
            return officertoUpdate.ToOfficerResponseDTo();
        }
    }
}
