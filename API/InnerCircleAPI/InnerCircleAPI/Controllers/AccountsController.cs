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

        // GET: api/Accounts1
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> GetAccounts()
        {
            return await _context.Accounts.ToListAsync();
        }

        // POST: api/Accounts1
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Account>> PostAccount(AccountDTO accountDTO)
        {
            var account = new Account
            {
                Username = new Username { Value = accountDTO.Username },
                Password = new Password { Value = accountDTO.Password },
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

        // GET: api/Accounts1/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccount(long id)
        {
            var account = await _context.Accounts.FindAsync(id);

            if (account == null)
            {
                return NotFound();
            }

            return account;
        }

        // PUT: api/Accounts1/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccount(long id, Account account)
        {
            var currentUser = HttpContext.User;
            int currentUserAccountID;
            Int32.TryParse(currentUser.Claims.FirstOrDefault(c => c.Type == "AccountID").Value,out currentUserAccountID);
            if (id != account.AccountId || id != currentUserAccountID)
            {
                return BadRequest();
            }

            _context.Entry(account).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Accounts1/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(long id)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AccountExists(long id)
        {
            return _context.Accounts.Any(e => e.AccountId == id);
        }
    }
}
