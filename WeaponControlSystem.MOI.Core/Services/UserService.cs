
using WeaponControlSystem.MOI.Core.Domain.Entities;
using WeaponControlSystem.MOI.Core.Domain.RepositoryContracts.Base;
using WeaponControlSystem.MOI.Core.DTOs.loginInfo;
using WeaponControlSystem.MOI.Core.DTOs.user;
using WeaponControlSystem.MOI.Core.ServiceContracts;
//using Microsoft.AspNetCore.Identity;
namespace WeaponControlSystem.MOI.Core.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<UserAddDto> AddUser(UserAddDto userAddDto)
        {
            //var passwordHasher = new PasswordHasher<User>();
            //string hashedPassword = passwordHasher.HashPassword(user, plainTextPassword);


            await _unitOfWork.User.Add(userAddDto.ToUser());
            await _unitOfWork.SaveChanges(CancellationToken.None);
            return userAddDto;
        }

        public async Task<UserResponseDTo> DeleteUser(int? UserId)
        {   var user = await _unitOfWork.User.GetById(UserId.Value);
            await _unitOfWork.User.Remove(user);
            await _unitOfWork.SaveChanges(CancellationToken.None);
            return user.ToUserResponseDTo();
        }

        public async Task<UserResponseDTo> GetUserById(int? userId)
        {
            var user= await _unitOfWork.User.GetById(userId.Value);
            return user.ToUserResponseDTo();
        }

        public async Task<bool> Login(string user,string password) {
            
            return false;
        
        } 
        public async Task<IEnumerable<UserResponseDTo>> GetUserList()
        {
            var users=await _unitOfWork.User.GetAll();
            return users.Select(x => x.ToUserResponseDTo());
        }

        public async Task<bool> Auth(LoginInfo info)
        {
            var user= await _unitOfWork.User.GetFirstOrDefault( x=>x.Email==info.Email&& x.Password == info.Pass);
            if (user != null)
            {   
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
