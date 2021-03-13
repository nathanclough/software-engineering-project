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

            // Create a token for the new account and add to response 
            var tokenString = _authManager.GenerateJSONWebToken(account);
            return Ok(new { token = tokenString, account =account });
        }

        // GET: api/Accounts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AccountDTO>> GetAccount(long id)
        {
            var account = await _context.Accounts.Include(a => a.Username).SingleOrDefaultAsync( a =>  a.AccountId == id);

            if (account == null)
            {
                return NotFound();
            }

            return new AccountDTO {
                AccountId = account.AccountId,
                Username = account.Username.Value,
                FirstName = account.FirstName,
                LastName = account.LastName
            };
           
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
