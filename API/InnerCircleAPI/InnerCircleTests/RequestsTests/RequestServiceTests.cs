using InnerCircleAPI.Controllers;
using InnerCircleAPI.Models;
using InnerCircleAPI.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace InnerCircleTests.RequestTests
{
    public class RequestServiceTests : RequestTest
    {
        public RequestServiceTests() : base (new DbContextOptionsBuilder<InnerCircleDataContext>()
            .UseSqlite("Filename=RequestTest.db").Options)
        {
        }

        [Fact]
        public void SaveRequest_ValidRequestDTO_RequestIsCreated()
        {
            // Create a new in memory context 
            using( var context = new InnerCircleDataContext(ContextOptions))
            {
                /// Arrange 
                // Create controller with the new context 
                var requestService = new RequestService(context);

                // Create a request DTO for accounts already in db
                var request = new RequestDTO
                {
                    SenderId = 1,
                    RecepientId = 2,
                };

                /// Act 
                requestService.SaveRequest(request);

                /// Assert 
                // Get a request from db with values in dto 
                var dbRequest = context.Requests.FirstOrDefault(r => r.SenderId == request.SenderId && r.RecepientId == r.RecepientId);

                // Ensure it is not null 
                Assert.NotNull(dbRequest);
            }
        }

        [Fact]
        public void GetRequests_GivenUserWithThreeRequests_ReturnsAllRequests()
        {
            using (var context = new InnerCircleDataContext(ContextOptions))
            {
                /// Arrange 
                // Get requestService 
                var requestService = new RequestService(context);
              
                // Create Request to account 2 from 1 
                var request = new RequestDTO { SenderId = 1, RecepientId = 2 };
                requestService.SaveRequest(request);

                // Create another Request to account 2 from 3 
                request = new RequestDTO { SenderId = 3, RecepientId = 2 };
                requestService.SaveRequest(request);

                /// Act
                // Get requests for account one 
                var requestsInDB = requestService.GetRequests(1);

                /// Assert
                // Ensure the total requests is one 
                Assert.True(requestsInDB.Count == 1);
            }
        }

        [Fact]
        public void RespondToRequest_Accept_AccountsAreAddedToEachothersCircle()
        {
            using (var context = new InnerCircleDataContext(ContextOptions))
            {
                /// Arrange 
                // Get requestService 
                var requestService = new RequestService(context);

                // Create Request to account 2 from 1 
                var request = new RequestDTO { SenderId = 1, RecepientId = 2 };
                requestService.SaveRequest(request);

                /// Act
                // Respond to the request 
                requestService.RespondToRequest(1, "Accepted");

                /// Assert
                // Get the Circle Account 1 and 2 
                var accountOneCircle = context.Circles.Include(c => c.Members).FirstOrDefault(c => c.AccountId == 1);
                var accountTwoCircle = context.Circles.Include(c => c.Members).FirstOrDefault(c => c.AccountId == 2);

                // Ensure that account1 circle has account 2 as member 
                Assert.Contains(accountOneCircle.Members, c => c.AccountId == 2);
                
                // Ensure that account2 circle has account 1 as member
                Assert.Contains(accountTwoCircle.Members, c => c.AccountId == 1);
            }
        }

        [Fact]
        public void RespondToRequest_Denied_AccountsAreAddedToEachothersCircle()
        {
            using (var context = new InnerCircleDataContext(ContextOptions))
            {
                /// Arrange 
                // Get requestService 
                var requestService = new RequestService(context);

                // Create Request to account 2 from 1 
                var request = new RequestDTO { SenderId = 1, RecepientId = 2 };
                requestService.SaveRequest(request);

                /// Act
                // Respond to the request 
                requestService.RespondToRequest(1, "Denied");

                /// Assert
                // Get the Circle Account 1 and 2 
                var accountOneCircle = context.Circles.Include(c => c.Members).FirstOrDefault(c => c.AccountId == 1);
                var accountTwoCircle = context.Circles.Include(c => c.Members).FirstOrDefault(c => c.AccountId == 2);

                // Ensure that account1 circle does not have account 2 as member 
                Assert.True(accountOneCircle.Members.Count == 0);

                // Ensure that account2 circle does not have account 1 as member
                Assert.True(accountTwoCircle.Members.Count == 0);
            }
        }

    }
}
