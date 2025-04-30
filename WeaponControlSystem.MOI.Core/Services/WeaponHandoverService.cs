using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.Domain.RepositoryContracts.Base;
using WeaponControlSystem.MOI.Core.DTOs.weaponHandover;
using WeaponControlSystem.MOI.Core.ServiceContracts;

namespace WeaponControlSystem.MOI.Core.Services
{
    public class WeaponHandoverService: IWeaponHandoverService
    {
        private readonly IUnitOfWork _unitOfWork;
        public WeaponHandoverService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<WeaponHandoverAddDTo> AddWeaponHandover(WeaponHandoverAddDTo weaponHandoverAddD)
        {
            await _unitOfWork.WeaponHandover.Add(weaponHandoverAddD.toWeaponHandover());
           await _unitOfWork.SaveChanges(CancellationToken.None);
            return weaponHandoverAddD;
        }
        public async Task<WeaponHandoverResponseDTo> DeleteWeaponHandover(int? weaponhandoverId)
        {
            var weaponhandover = await _unitOfWork.WeaponHandover.GetById(weaponhandoverId.Value);
            await _unitOfWork.WeaponHandover.Remove(weaponhandover);
            await _unitOfWork.SaveChanges(CancellationToken.None);
            return weaponhandover.ToWeaponHandoverResponseDTo();
        }
        public async Task<WeaponHandoverResponseDTo> GetWeaponHandoverById(int? weaponhandoverId)
        {
          var weaponhandover= await _unitOfWork.WeaponHandover.GetById(weaponhandoverId.Value);
            return weaponhandover.ToWeaponHandoverResponseDTo();
        }
        public async Task<IEnumerable<WeaponHandoverResponseDTo>> GetWeaponHandoverList()
        {
           var weaponhandovers= await _unitOfWork.WeaponHandover.GetAll();
            return weaponhandovers.Select(x => x.ToWeaponHandoverResponseDTo());
        }
    }
    

    }

