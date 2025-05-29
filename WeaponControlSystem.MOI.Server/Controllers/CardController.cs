using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using WeaponControlSystem.MOI.Core.Domain.Entities;
using WeaponControlSystem.MOI.Core.DTOs.card;
using WeaponControlSystem.MOI.Core.ServiceContracts;
using WeaponControlSystem.MOI.Infrastructure.dbContext;

namespace WeaponControlSystem.MOI.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly ICardService _cardService;

        public CardController(ICardService cardService)
        {
            _cardService = cardService;
        }

        // GET: api/Card
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CardResponseDto>>> GetCards()
        {   var cards = await _cardService.GetCardList();
         
            return cards.ToList();
        }

        // GET: api/Card/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CardResponseDto>> GetCard(int id)
        {
            var card = await _cardService.GetCardById(id);

            if (card == null)
            {
                return NotFound();
            }

            return card;
        }

        // PUT: api/Card/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<CardResponseDto> UpdateCard(int id, CardAddDto card)
        {
            if (id >=0&& card!=null)
            {
                var updatedCard = await _cardService.UpdateCard(id, card);
                if (updatedCard == null)
                {
                    return null; // or throw an exception
                }



                return updatedCard;
            }

           

            throw new Exception("Invalid card data or ID provided.");
        }

        // POST: api/Card
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<int> AddCard(CardAddDto card)
        {  
           return await _cardService.AddCard(card);
        }

        // DELETE: api/Card/5
        [HttpDelete("{id}")]
        public async Task<CardResponseDto> DeleteCard(int id)
        {
            return await _cardService.DeleteCard(id);
        }
    }
}
