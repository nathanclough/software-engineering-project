using InnerCircleAPI.Models;
using InnerCircleAPI.Models.DTOs;
using InnerCircleAPI.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace InnerCircleTests.AccountsTests
{
    public class AccountServiceTests : AccountsTest
    {
        public AccountServiceTests() : base(new DbContextOptionsBuilder<InnerCircleDataContext>()
            .UseSqlite("Filename=AccountTest.db").Options)
        {
        }
        private void CreateAccounts(int count, InnerCircleDataContext context)
        {
            for (int i = 0; i < 5; i++)
            {
                var account1 = new Account
                {
                    Email = new Email
                    {
                        Value = $"Account{i}@email.com",
                    },
                    Username = new Username
                    {
                        Value = $"Account{i}Username"
                    },
                    Password = new Password
                    {
                        Value = "Password"
                    }
                };
                context.Add(account1);
                context.SaveChanges();
            }
        }

       private void JoinCircle(long id1, long id2, InnerCircleDataContext context)
        {
            var requestService = new RequestService(context);
            requestService.SaveRequest(new RequestDTO { RecepientId = id1, SenderId = id2, RecepientUsername = "", SenderUsername = "" });
            var requests = requestService.GetRequests(id1);
            requestService.RespondToRequest(requests.FirstOrDefault().RequestId, "Accepted"); 
            
        }
        [Fact]
        public void CreateAccount_NewUsername_AccountIsSaved()
        {
            using (var context = new InnerCircleDataContext(ContextOptions))
            {
                /// Arrange 
                // Get Accounts service
                var AccountService = new AccountService(context);
                
                // Create a new account DTO
                var account = new AccountDTO
                {
                    Username = "Account1UserName",
                    Password = "Password",
                    Email = "email@a.com",
                    FirstName = "A1First",
                    LastName = "A1Last"
                };

                /// Act 
                // Create the account 
                AccountService.CreateAccount(account);

                /// Assert 
                // Ensure the account was created in the db 
                var SavedAccount = context.Accounts.FirstOrDefault(a => a.AccountId == 1);

                Assert.NotNull(SavedAccount);
            }
        }

        [Fact]
        public void CreateAccount_UsernameAlreadyInUse_ThrowsException()
        {
            using (var context = new InnerCircleDataContext(ContextOptions))
            {
                /// Arrange 
                // Get Accounts service
                var AccountService = new AccountService(context);

                // Create a new account DTO
                var account = new AccountDTO
                {
                    Username = "Account1UserName",
                    Password = "Password",
                    Email = "email@a.com",
                    FirstName = "A1First",
                    LastName = "A1Last"
                };

                AccountService.CreateAccount(account);

                // Change values in dto other than the username 
                account.Email = "newEmail@a.com";
                account.FirstName = "first";
                account.LastName = "last";
                
                /// Act 
                // Create another account with same username 
                var exception = Record.Exception( () => AccountService.CreateAccount(account) );
               
                /// Assert 
                // Ensure exception was thrown 
                Assert.NotNull(exception);
            }
        }

        [Fact]
        public void GetAccount_AccountExistsAndIsInCircle_ReturnsDtoWithCorrectValues()
        {
            using (var context = new InnerCircleDataContext(ContextOptions))
            {
                /// Arrange
                // Create accounts and join circle
                CreateAccounts(2,context);
                JoinCircle(1, 2,context);

                // Create AccountService
                var AccountService = new AccountService(context);

                /// Act 
                // Try to view account 2 with account 1 
                var accountViewDTO = AccountService.GetAccount(1, 2);

                Assert.False(accountViewDTO.Requestable);
            }
        }

        [Fact]
        public void GetAccount_AccountExistsAndIsNotInCircle_ReturnsDtoWithCorrectValues()
        {
            using (var context = new InnerCircleDataContext(ContextOptions))
            {
                /// Arrange
                // Create accounts and join circle
                CreateAccounts(2, context);

                // Create AccountService
                var AccountService = new AccountService(context);

                /// Act 
                // Try to view account 2 with account 1 
                var accountViewDTO = AccountService.GetAccount(1, 2);

                Assert.True(accountViewDTO.Requestable);
            }
        }

        [Fact]
        public void GetAccount_AccountExistsAndHasPendingRequest_ReturnsDtoWithCorrectValues()
        {
            using (var context = new InnerCircleDataContext(ContextOptions))
            {
                /// Arrange
                // Create accounts and join circle
                CreateAccounts(2, context);

                // Create a request for the accounts 
                var RequestService = new RequestService(context);
                RequestService.SaveRequest(new RequestDTO { RecepientId = 1, SenderId = 2 });

                // Create AccountService
                var AccountService = new AccountService(context);

                /// Act 
                // Try to view account 2 with account 1 
                var accountViewDTO = AccountService.GetAccount(1, 2);

                Assert.False(accountViewDTO.Requestable);
            }
        }
    }
}
