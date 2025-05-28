using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.Domain.Entities;

namespace WeaponControlSystem.MOI.Core.DTOs.card
{
    public  class CardResponseDto
    {
        public int Id { get; set; }
        public string CardNo { get; set; } // Unique identifier for the card

        public DateTime IssueDate { get; set; } // Date when the card was issued

        public DateTime? ReturnDate { get; set; } // Date when the card was returned, nullable if not yet returned

        public List<int> Weaponsid { get; set; }
    }
    public static class CardExtensions
    {
        public static CardResponseDto ToCardResponseDto(this Card card)
        {
           
            return new CardResponseDto
                {
                    Id = card.Id,
                    CardNo = card.CardNo,
                    IssueDate = card.IssueDate,
                    ReturnDate = card.ReturnDate,
                    Weaponsid = card.Weaponsid
            };
        }
    }
}
