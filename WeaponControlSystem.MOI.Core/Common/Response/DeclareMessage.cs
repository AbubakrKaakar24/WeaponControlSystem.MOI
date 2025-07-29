using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WeaponControlSystem.MOI.Core.Common.Response
{
    public  class DeclareMessage
    {
        public static ValidationError NotFound = new() { Code = nameof(NotFound), Description = "Not Found" };
        public static ValidationError InvalidOperation = new() { Code = nameof(InvalidOperation), Description = "Invalid Operation" };
        public static ValidationError BadRequest = new() { Code = nameof(BadRequest), Description = "Bad Request" };
        public static ValidationError EmptyList = new() { Code = nameof(EmptyList), Description = "List is Empty" };
        public static ValidationError CardNumberExceeds = new() { Code = nameof(CardNumberExceeds), Description = "Card number is exceeded" };

    }
}
