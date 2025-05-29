using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.DTOs.user;
using WeaponControlSystem.MOI.Core.DTOs.weapon;
namespace WeaponControlSystem.MOI.Core.ServiceContracts
{
    public  interface IWeaponService
    {
        public Task<WeaponAddDTo> AddWeapon(WeaponAddDTo weaponAddDTo);
        public Task<WeaponResponseDTo> GetWeaponById(int? WeaponId);

        public Task<IEnumerable<WeaponResponseDTo>> GetWeaponList();

        public Task<WeaponResponseDTo> DeleteWeapon(int? weaponId);

        public Task<WeaponResponseDTo> UpdateWeapon(int id, WeaponAddDTo weaponAddDTo);

        public Task<IEnumerable<WeaponResponseDTo>> GetByOfficerId(int id);

        public Task<int> Count();

    }
}
