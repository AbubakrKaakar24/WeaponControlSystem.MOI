using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.Domain.Entities;

namespace WeaponControlSystem.MOI.Core.DTOs.card
{
    public class CardAddDto
    {
        public string CardNo { get; set; } // Unique identifier for the card

        public DateTime IssueDate { get; set; } // Date when the card was issued

        public DateTime? ReturnDate { get; set; } // Date when the card was returned, nullable if not yet returned

        public List<int> weaponsId { get; set; }

        public Card toCard()
        {
            return new Card
            {
                CardNo = CardNo,
                IssueDate = IssueDate,
                ReturnDate = ReturnDate,
                Weaponsid = weaponsId
            };
        }
    }
}
