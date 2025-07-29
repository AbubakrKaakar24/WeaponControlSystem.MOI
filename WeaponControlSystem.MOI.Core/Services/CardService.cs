using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponControlSystem.MOI.Core.Common.Response;
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
        public async Task<Result<int>> AddCard(CardAddDto cardAddDto)
        {   Card card = cardAddDto.toCard();
            int count = await _unitOfWork.Card.Count();
            
            if (count >= 100)
            {
                return Result<int>.WithError(DeclareMessage.CardNumberExceeds);
            }
            card.CardNo= (count + 1).ToString(); // Assuming CardNo is a sequential number based on the count
            await _unitOfWork.Card.Add(card);
            await _unitOfWork.SaveChanges(CancellationToken.None);
            return Result<int>.SuccessResult(count+1);
        }

        public async Task<Result<CardResponseDto>> DeleteCard(int? cardId)
        {   
            if (cardId == null)
            return Result<CardResponseDto>.FailureResult(DeclareMessage.InvalidOperation.Code, "Card No cannot be null.");

            string cardNo = cardId.ToString();

            var card = await _unitOfWork.Card.GetFirstOrDefault(c => c.CardNo == cardNo);
            if (card == null)
            return Result<CardResponseDto>.NotFoundResult(cardId);

            await _unitOfWork.Card.Remove(card);
            await _unitOfWork.SaveChanges(CancellationToken.None);

            return Result<CardResponseDto>.SuccessResult(card.ToCardResponseDto());
        }


        public async Task<Result<CardResponseDto>> GetCardById(int? cardId)
        {   var No= cardId.ToString();
            var card= await _unitOfWork.Card.GetFirstOrDefault(c => c.CardNo == No);
            if (card == null)
            {
                return Result<CardResponseDto>.NotFoundResult(cardId);
            }
            return Result<CardResponseDto>.SuccessResult(card.ToCardResponseDto());
        }

        public async Task<Result<IEnumerable<CardResponseDto>>> GetCardList()
        {
            var cards = await _unitOfWork.Card.GetAll();

            if (cards == null || !cards.Any())
            {
                return Result<IEnumerable<CardResponseDto>>.EmptyResult("Card");
            }

            var response = cards.Select(c => c.ToCardResponseDto()).ToList();

            return Result<IEnumerable<CardResponseDto>>.SuccessResult(response);
        }


        public async Task<Result<CardResponseDto>> UpdateCard(int id, CardAddDto cardDTo)
        {  var cardToUpdate= await _unitOfWork.Card.GetById(id);
           
         
            cardToUpdate.IssueDate = cardDTo.IssueDate;
            cardToUpdate.ReturnDate = cardDTo.ReturnDate;
            cardToUpdate.CardNo = cardDTo.CardNo;
            cardToUpdate.Weaponsid = cardDTo.weaponsId;
            await _unitOfWork.Card.Update(cardToUpdate);
            await _unitOfWork.SaveChanges(CancellationToken.None);
            return Result<CardResponseDto>.SuccessResult(cardToUpdate.ToCardResponseDto());

        }
    }
}
