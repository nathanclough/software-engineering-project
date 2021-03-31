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

namespace InnerCircleAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly InnerCircleDataContext _context;
        private readonly Authorization _authManager;


        public AccountsController(InnerCircleDataContext context, Authorization authManager)
        {
            _context = context;
            _authManager = authManager;
        }

        // POST: api/Accounts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Account>> PostAccount(AccountDTO accountDTO)
        {
            // Verify the new account is unique
            var existingAcct = _context.Usernames.Where(a => a.Value == accountDTO.Username).FirstOrDefault();

            if (existingAcct == null)
            {
                var account = new Account
                {
                    Username = new Username { Value = accountDTO.Username },
                    Password = new Password { Value = BC.HashPassword(accountDTO.Password) },
                    Email = new Email { Value = accountDTO.Email },
                    FirstName = accountDTO.FirstName,
                    LastName = accountDTO.LastName

                };

                _context.Accounts.Add(account);
                await _context.SaveChangesAsync();

                accountDTO.AccountId = account.AccountId;

                // Create a token for the new account and add to response 
                var tokenString = _authManager.GenerateJSONWebToken(account);
                return Ok(new { token = tokenString, account = accountDTO });
            }
            else
                return BadRequest("Username is already in use");

        }

        // GET: api/Accounts/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<AccountDTO>> GetAccount(long id)
        {
            var viewerUserId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "AccountID").Value;
            var account = await _context.Accounts.Include(a => a.Username).Include(a => a.Circle).SingleOrDefaultAsync(a => a.AccountId == id);

            if (account == null)
            {
                return NotFound();
            }

            var pendingRequests = new List<Request>();
            var inCircle = (account.Circle.Members.Where(a => a.AccountId.ToString() == viewerUserId).FirstOrDefault() != null);
            if (!inCircle)
                pendingRequests = await _context.Requests.Where(r => r.Status == "Pending" && ((r.RecepientId == id && r.SenderId.ToString() == viewerUserId) || (r.RecepientId.ToString() == viewerUserId && r.SenderId == id))).ToListAsync();
            return new AccountDTO {
                AccountId = account.AccountId,
                Username = account.Username.Value,
                FirstName = account.FirstName,
                LastName = account.LastName,
                Requestable = !inCircle && pendingRequests.Count == 0 && viewerUserId != account.AccountId.ToString()
            };

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
