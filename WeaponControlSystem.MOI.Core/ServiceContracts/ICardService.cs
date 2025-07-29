using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.Common.Response;
using WeaponControlSystem.MOI.Core.DTOs.card;

namespace WeaponControlSystem.MOI.Core.ServiceContracts
{
    public  interface ICardService
    {
        Task<Result<int>> AddCard(CardAddDto cardAddDto);
        Task<Result<CardResponseDto>> GetCardById(int? cardId);
        Task<Result<IEnumerable<CardResponseDto>>> GetCardList();
        Task<Result<CardResponseDto>> UpdateCard(int id, CardAddDto cardDTo);
        Task<Result<CardResponseDto>> DeleteCard(int? cardId);

    }
}
