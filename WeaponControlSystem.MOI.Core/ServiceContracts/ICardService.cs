using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.DTOs.card;

namespace WeaponControlSystem.MOI.Core.ServiceContracts
{
    public  interface ICardService
    {
        Task<CardAddDto> AddCard(CardAddDto cardAddDto);
        Task<CardResponseDto> GetCardById(int? cardId);
        Task<IEnumerable<CardResponseDto>> GetCardList();
        Task<CardResponseDto> UpdateCard(int id, CardAddDto cardDTo);
        Task<CardResponseDto> DeleteCard(int? cardId);

    }
}
