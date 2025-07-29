using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WeaponControlSystem.MOI.Core.Common.Response
{
    public class Result
    {public long Id { get; set; }
    public string? Message { get; set; }
        public bool Success { get; set; }
        public List<string?> Errors { get; set; } = new List<string?>();
    }

    public class Result<T>
    {
        public long Id { get; set; }
        public string? Message { get; set; }
        public bool Success { get; set; }
        public T Response { get; set; }
        public List<ValidationError> Errors { get; set; }

        public static Result<T> SuccessResult(T? response)
        {
            return new Result<T> { Success = true, Response = response };
        }
        public static Result<T> NotFoundResult(int? id) {
            return new Result<T>
            {
                Success = false,
                Message = $"Entit with Id {id} Not Found"
            };
            
            }

        public static Result<T> EmptyResult(string? entity = null)
        {
            return new Result<T>
            {
                Success = false,
                Message = $"The list of entity {entity}"
            };
        }
        public static Result<T> FailureResult(string code, string Description)
        {
            return new Result<T>
            {
                Success = false,
                Errors = new List<ValidationError>
                {
                    new ValidationError{Code = code,Description=Description},
                },
            };
        }
        public static Result<T> WithError(ValidationError error)
        {
            return new Result<T>
            {
                Success = false,
                Errors = new List<ValidationError> { error },
            };
        }
        public static Result<T> WithErrors(List<ValidationError> errors)
        {
            return new Result<T>
            {
                Success = false,
                Errors = errors
            };
        }
    }
}
