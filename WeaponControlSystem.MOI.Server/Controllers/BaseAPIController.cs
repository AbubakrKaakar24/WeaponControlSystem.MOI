using Microsoft.AspNetCore.Mvc;
using WeaponControlSystem.MOI.Core.Common.Response;

namespace WeaponControlSystem.MOI.Server.Controllers
{
    public class BaseAPIController:ControllerBase
    {
        public IActionResult HandleResult<T> (Result<T> response)
        {
            try
            {
                if (response.Success && response.Response == null)
                    return NotFound();
                else if (response.Success && response.Response != null)
                    return Ok(response.Response);
                else if (!response.Success && response.Errors != null)
                    return BadRequest(response.Errors);
                else return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        public ActionResult<T> HandleResultRepsonse<T>(Result<T> response)
        {
            try
            {
                if (response.Success && response.Response != null)
                    return Ok(response.Response);
                else if (response.Success && response.Response == null)
                    return NotFound();
                else if (!response.Success && response.Errors != null)
                    return BadRequest(response.Errors);
                else
                    return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
