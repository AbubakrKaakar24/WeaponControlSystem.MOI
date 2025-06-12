
using WeaponControlSystem.MOI.Core.DTOs.loginInfo;
using WeaponControlSystem.MOI.Core.DTOs.user;
namespace WeaponControlSystem.MOI.Core.ServiceContracts
{
    public  interface IUserService
    {
        public Task<UserAddDto> AddUser(UserAddDto userAddDto);
        public Task<UserResponseDTo> GetUserById(string? userId);
        public Task<IEnumerable<UserResponseDTo>> GetUserList();
        public Task<UserResponseDTo> DeleteUser(string? UserId);
        public Task<UserResponseDTo> UpdateUser(string userId, UserAddDto user);
        public Task<UserResponseDTo> getUserByName(string name);
        public Task<bool> Auth(LoginInfo info);

    }
}
