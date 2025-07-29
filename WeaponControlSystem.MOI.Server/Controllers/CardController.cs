using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using WeaponControlSystem.MOI.Core.Common.Response;
using WeaponControlSystem.MOI.Core.Domain.Entities;
using WeaponControlSystem.MOI.Core.DTOs.card;
using WeaponControlSystem.MOI.Core.ServiceContracts;
using WeaponControlSystem.MOI.Infrastructure.dbContext;

namespace WeaponControlSystem.MOI.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : BaseAPIController
    {
        private readonly ICardService _cardService;

        public CardController(ICardService cardService)
        {
            _cardService = cardService;
        }

        // GET: api/Card
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CardResponseDto>>> GetCards()
            =>
            HandleResultRepsonse(await _cardService.GetCardList());
        // GET: api/Card/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CardResponseDto>> GetCard(int id) =>
            HandleResultRepsonse(await _cardService.GetCardById(id));


        // PUT: api/Card/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<CardResponseDto>> UpdateCard(int id, CardAddDto card) =>
        HandleResultRepsonse(await _cardService.UpdateCard(id, card));
        // POST: api/Card
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<int>> AddCard(CardAddDto card) =>
            HandleResultRepsonse(await _cardService.AddCard(card));

        // DELETE: api/Card/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CardResponseDto>> DeleteCard(int id) =>
            HandleResultRepsonse(await _cardService.DeleteCard(id));
       
    }
}
