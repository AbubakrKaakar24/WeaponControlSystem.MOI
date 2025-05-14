using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.DTOs.loginInfo;
using WeaponControlSystem.MOI.Core.DTOs.user;
namespace WeaponControlSystem.MOI.Core.ServiceContracts
{
    public  interface IUserService
    {
        public Task<UserAddDto> AddUser(UserAddDto userAddDto);
        public Task<UserResponseDTo> GetUserById(int? userId);

        public Task<IEnumerable<UserResponseDTo>> GetUserList();

        public Task<UserResponseDTo> DeleteUser(int? UserId);
        public Task<UserResponseDTo> UpdateUser(int userId, UserAddDto user);
        public Task<UserResponseDTo> getUserByName(string name);
        public Task<bool> Auth(LoginInfo info);

    }
}
