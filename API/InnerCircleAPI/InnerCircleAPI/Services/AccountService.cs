using InnerCircleAPI.Models;
using InnerCircleAPI.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InnerCircleAPI.Services
{
    public class AccountService
    {
        private readonly InnerCircleDataContext _context;
        public AccountService(InnerCircleDataContext context)
        {
            _context = context;
        }

        public Account CreateAccount(AccountDTO accountDTO)
        {
            // Verify the new account is unique
            var existingAcct = _context.Usernames.Where(a => a.Value == accountDTO.Username).FirstOrDefault();

            if (existingAcct == null)
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
                _context.SaveChanges();

                return account;
            }
            else
            {
                throw new Exception("Username Already In Use");
            }
        }

        public AccountDTO GetAccount(long viewerUserId, long accountId)
        {
            var account =  _context.Accounts.Include(a => a.Username).Include(a => a.Circle.Members).SingleOrDefault(a => a.AccountId == accountId);

            // If there is no account with the requested account ID
            if (account == null)
                return null;

            // Check if the account is in the circle of the viewer 
            var pendingRequests = new List<Request>();
            var inCircle = (account.Circle.Members.Where(a => a.AccountId == viewerUserId).FirstOrDefault() != null);
            
            if (!inCircle)
                pendingRequests = _context.Requests.Where(r => r.Status == "Pending" && ((r.RecepientId == accountId && r.SenderId == viewerUserId) || (r.RecepientId == viewerUserId && r.SenderId == accountId))).ToList();
            return new AccountDTO
            {
                AccountId = account.AccountId,
                Username = account.Username.Value,
                FirstName = account.FirstName,
                LastName = account.LastName,
                Requestable = !inCircle && pendingRequests.Count == 0 && viewerUserId != account.AccountId
            };
        }
    }
}
