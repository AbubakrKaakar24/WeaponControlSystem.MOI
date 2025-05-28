using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.Domain.Entities;
using WeaponControlSystem.MOI.Core.Domain.RepositoryContracts.Base;
using WeaponControlSystem.MOI.Core.DTOs.card;
using WeaponControlSystem.MOI.Core.ServiceContracts;

namespace WeaponControlSystem.MOI.Core.Services
{
    public class CardService : ICardService
    {   private readonly IUnitOfWork _unitOfWork;
        public CardService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<CardAddDto> AddCard(CardAddDto cardAddDto)
        {   Card card = cardAddDto.toCard();
            await _unitOfWork.Card.Add(card);
            await _unitOfWork.SaveChanges(CancellationToken.None);
            return cardAddDto;
        }

        public async Task<CardResponseDto> DeleteCard(int? cardId)
        {
            var card = await _unitOfWork.Card.GetById(cardId.Value);
            if (card == null)
            {
                throw new ArgumentException("Card not found");
            }
            await _unitOfWork.Card.Remove(card);
            await _unitOfWork.SaveChanges(CancellationToken.None);
            return card.ToCardResponseDto();
        }

        public async Task<CardResponseDto> GetCardById(int? cardId)
        {
            var card= await _unitOfWork.Card.GetById(cardId.Value);
            if (card == null)
            {
                throw new ArgumentException("Card not found");
            }
            return card.ToCardResponseDto();
        }

        public async Task<IEnumerable<CardResponseDto>> GetCardList()
        {
            var cards = await _unitOfWork.Card.GetAll();
            if (cards == null)
            {
                throw new ArgumentException("No cards found");
            }
            return cards.Select(c => c.ToCardResponseDto()).ToList();

        }

        public async Task<CardResponseDto> UpdateCard(int id, CardAddDto cardDTo)
        {  var cardToUpdate= await _unitOfWork.Card.GetById(id);
           
         
            cardToUpdate.IssueDate = cardDTo.IssueDate;
            cardToUpdate.ReturnDate = cardDTo.ReturnDate;
            cardToUpdate.CardNo = cardDTo.CardNo;
            cardToUpdate.Weaponsid = cardDTo.weaponsId;
            await _unitOfWork.Card.Update(cardToUpdate);
            await _unitOfWork.SaveChanges(CancellationToken.None);
            return cardToUpdate.ToCardResponseDto();

        }
    }
}
