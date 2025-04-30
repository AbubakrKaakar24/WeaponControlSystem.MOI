using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.DTOs.weaponHandover;
namespace WeaponControlSystem.MOI.Core.ServiceContracts
{
    public interface IWeaponHandoverService
    {
        public Task<WeaponHandoverAddDTo> AddWeaponHandover(WeaponHandoverAddDTo weaponHandoverAddD);
        public Task<WeaponHandoverResponseDTo> GetWeaponHandoverById(int? weaponhandoverId);

        public Task<IEnumerable<WeaponHandoverResponseDTo>> GetWeaponHandoverList();

        public Task<WeaponHandoverResponseDTo> DeleteWeaponHandover(int? weaponhandoverId);

    }
}
