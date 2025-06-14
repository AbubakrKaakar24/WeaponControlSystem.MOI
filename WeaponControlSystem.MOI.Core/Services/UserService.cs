
using Microsoft.AspNetCore.Identity;
using WeaponControlSystem.MOI.Core.Domain.Entities;
using WeaponControlSystem.MOI.Core.Domain.RepositoryContracts.Base;
using WeaponControlSystem.MOI.Core.DTOs.loginInfo;
using WeaponControlSystem.MOI.Core.DTOs.user;
using WeaponControlSystem.MOI.Core.ServiceContracts;
namespace WeaponControlSystem.MOI.Core.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        public UserService(UserManager<ApplicationUser> userManager,RoleManager<ApplicationRole> roleManager,IUnitOfWork unitOfWork,SignInManager<ApplicationUser> signInManager)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;

        }
        public async Task<UserAddDto> AddUser(UserAddDto userAddDto)
        {
            var user = userAddDto.ToUser();
            if (user != null)
            {
                var result = await _userManager.CreateAsync(user, userAddDto.Password);
                if (!result.Succeeded)
                {
                    var errors = string.Join("; ", result.Errors.Select(e => e.Description));
                    throw new Exception($"User creation failed: {errors}");
                }
                if (!await _roleManager.RoleExistsAsync("Admin"))
                {
                    await _roleManager.CreateAsync(new ApplicationRole("Admin"));
                }

                await _userManager.AddToRoleAsync(user, "Admin");
            }
            return userAddDto;
        }

        public async Task<UserResponseDTo> DeleteUser(string? UserId)
        {   var user= await _userManager.FindByIdAsync(UserId);
            if (user == null)
                throw new Exception("User Not Found!");
            var result= await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
                throw new Exception("User Could not be deleted");
            
 
            return user.ToUserResponseDTo();
        }

        public async Task<UserResponseDTo> GetUserById(string? userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            return user.ToUserResponseDTo();
        }

     
        public async Task<IEnumerable<UserResponseDTo>> GetUserList()
        {
            var users =  _userManager.Users.ToList();
            return users.Select(x => x.ToUserResponseDTo());
        }
        public async Task<bool> Login(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return false;

            //return await _userManager.CheckPasswordAsync(user, password);
            var result= await _signInManager.PasswordSignInAsync(user.UserName, password, isPersistent:false, lockoutOnFailure:false);
             return result.Succeeded;
        }
        public async Task<bool> Auth(LoginInfo info)
        {
            return await Login(info.Email, info.Pass);

        }

        public async Task<UserResponseDTo> UpdateUser(string userId, UserAddDto updatedDto)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                throw new Exception("User not found");

            user.Name = updatedDto.Name;
            user.LastName = updatedDto.LastName;
            user.Email = updatedDto.Email;
            user.PhoneNumber = updatedDto.Phone;
            user.Gate = updatedDto.Gate;
            user.UserName = updatedDto.Email; // Important for Identity consistency

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
                throw new Exception("User update failed: " + string.Join(", ", result.Errors.Select(e => e.Description)));

            return user.ToUserResponseDTo();
        }


        public async Task<UserResponseDTo> getUserByName(string name)
        {
            var user = _userManager.Users.FirstOrDefault(u => u.Name == name);
            if (user == null)
                throw new Exception("User not found");

            return user.ToUserResponseDTo();
        }
    }
}
