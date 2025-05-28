using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WeaponControlSystem.MOI.Core.Domain.Entities
{
    public  class Card
    {   
        public int Id { get; set; }
        public string CardNo { get; set; } // Unique identifier for the card

        public DateTime IssueDate { get; set; } // Date when the card was issued

        public DateTime? ReturnDate { get; set; } // Date when the card was returned, nullable if not yet returned

        public List<int> Weaponsid { get; set; } // List of weapon IDs associated with the card
        public ICollection<Weapon> Weapons { get; set; }

    }
}
