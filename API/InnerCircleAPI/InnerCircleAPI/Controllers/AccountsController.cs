using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InnerCircleAPI.Models;
using Microsoft.AspNetCore.Authorization;
using InnerCircleAPI.Models.DTOs;
using InnerCircleAPI.Controllers.ServiceCommon;
using BC = BCrypt.Net.BCrypt;
using System.Text.RegularExpressions;
using InnerCircleAPI.Services;

namespace InnerCircleAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly InnerCircleDataContext _context;
        private readonly Authorization _authManager;
        private readonly AccountService AccountService;

        public AccountsController(InnerCircleDataContext context, Authorization authManager)
        {
            _context = context;
            _authManager = authManager;
            AccountService = new AccountService(context);
        }

        // POST: api/Accounts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public ActionResult<Account> PostAccount(AccountDTO accountDTO)
        {
            // Hash the password
            accountDTO.Password = BC.HashPassword(accountDTO.Password);
            try
            {
                // Create account 
                var account = AccountService.CreateAccount(accountDTO);

                // Generate new token and give response
                var tokenString = _authManager.GenerateJSONWebToken(account);

                // Change password so it isnt returned and send ok response
                accountDTO.Password = "";

                // Update the dto with the created account ID 
                accountDTO.AccountId = account.AccountId;
                return Ok(new { token = tokenString, account = accountDTO });
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }     
        }

        // GET: api/Accounts/5
        [Authorize]
        [HttpGet("{id}")]
        public ActionResult<AccountDTO> GetAccount(long id)
        {
            long viewerUserId;
            long.TryParse(HttpContext.User.Claims.FirstOrDefault(c => c.Type == "AccountID").Value, out viewerUserId);

            var account = AccountService.GetAccount(viewerUserId, id);
            if (account == null)
            {
                return NotFound();
            }
            else return account;

        }

        [Route("Circle")]
        [HttpGet]
        public async Task<ActionResult<List<AccountDTO>>> GetCircle(long id){
            var circle = await _context.Circles.Include(c=> c.Members).FirstOrDefaultAsync(a => a.AccountId == id);
            if (circle != null)
                return circle.Members.Select(c => new AccountDTO { AccountId = c.AccountId, Username = _context.Usernames.FirstOrDefault(u => u.AccountID == c.AccountId).Value }).ToList();
            else return new List<AccountDTO>();
        }

        [HttpGet]
        public async Task<ActionResult<List<AccountDTO>>> GetAccounts(string username)
        {
            var a = await _context.Accounts.Include(a => a.Username).Where(a => a.Username.Value.Contains(username)).Take(10).Select(a => new AccountDTO
            {
                AccountId = a.AccountId,
                Username = a.Username.Value,
                FirstName = a.FirstName,
                LastName = a.LastName
            }).ToListAsync();

            return a;
            
        }

        // DELETE: api/Accounts/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(long id)
        {
            if (HttpContext.User.Claims.FirstOrDefault(c => c.Type == "AccountID").Value != id.ToString())
                return Unauthorized();

            var account = await _context.Accounts.SingleOrDefaultAsync(a => a.AccountId == id);
            if (account == null)
            {
                return NotFound();
            }

            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
