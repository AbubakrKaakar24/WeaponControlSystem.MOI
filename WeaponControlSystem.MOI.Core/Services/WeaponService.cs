
using WeaponControlSystem.MOI.Core.Domain.RepositoryContracts.Base;
using WeaponControlSystem.MOI.Core.DTOs.weapon;
using WeaponControlSystem.MOI.Core.ServiceContracts;

namespace WeaponControlSystem.MOI.Core.Services
{
    public class WeaponService : IWeaponService
    {
        private readonly IUnitOfWork _unitOfWork;
        public WeaponService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<WeaponAddDTo> AddWeapon(WeaponAddDTo weaponAddDTo)
        {
            var weapon = weaponAddDTo.toWeapon();
            await _unitOfWork.Weapon.Add(weapon);
            await _unitOfWork.SaveChanges(CancellationToken.None);
            return weaponAddDTo;
        }

        public async Task<int> Count()
        {   var total= await _unitOfWork.Weapon.GetAll(w => w.In == true);
            return total.Count;
        }

        public async Task<WeaponResponseDTo> DeleteWeapon(int? weaponId)
        {
            var weapon =await _unitOfWork.Weapon.GetById(weaponId.Value);
            await _unitOfWork.Weapon.Remove(weapon);
            await _unitOfWork.SaveChanges(CancellationToken.None);
            return weapon.ToWeaponResponseDTo();
        }

        public async Task<IEnumerable<WeaponResponseDTo>> GetByOfficerId(int id)
        {
            var weapons = await _unitOfWork.Weapon.GetAll(w => w.OfficerId == id);
            return weapons.Select(w => w.ToWeaponResponseDTo());

        }

        public async Task<WeaponResponseDTo> GetWeaponById(int? WeaponId)
        {
          var weapon= await _unitOfWork.Weapon.GetById(WeaponId.Value);
            return weapon.ToWeaponResponseDTo();
        }

        public async Task<IEnumerable<WeaponResponseDTo>> GetWeaponList()
        {
            var weapons = await _unitOfWork.Weapon.GetAll();
            return weapons.Select(x => x.ToWeaponResponseDTo());
        }

        public async Task<WeaponResponseDTo> UpdateWeapon(int id, WeaponAddDTo weaponAddDTo)
        {   var weaponToUpdate= await _unitOfWork.Weapon.GetFirstOrDefault(w=>w.Id==id);
            if (weaponToUpdate!=null)
            { 
              weaponToUpdate.Name=weaponAddDTo.Name;
                weaponToUpdate.Type = weaponAddDTo.Type;
                weaponToUpdate.SerialNo = weaponAddDTo.SerialNo;
                weaponToUpdate.In = weaponAddDTo.In;
                await _unitOfWork.Weapon.Update(weaponToUpdate);
                await _unitOfWork.SaveChanges(CancellationToken.None);
                return weaponToUpdate.ToWeaponResponseDTo();
            }
            else
            {
                return null;
            }
        }
    }
}
