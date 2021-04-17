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

namespace InnerCircleTests.MessageTests
{
    public class MessageServiceTest : MessageTest
    {
        public MessageServiceTest() : base(new DbContextOptionsBuilder<InnerCircleDataContext>()
            .UseSqlite("Filename=AccountTest.db").Options)
        {
        }
        [Fact]
        public void CreateMessage_ValidMessageDTO_SaveMessage()
        {
            using (var context = new InnerCircleDataContext(ContextOptions))
            {
                var MessageService = new MessageService(context);

                // Create a new message DTO
                var message = new MessageDTO
                {
                    RecepientId = 2,
                    SenderId = 1,
                    Message = "Hello"
                };
                MessageService.CreateMessage(message);

                var SavedMessage = context.Messages.FirstOrDefault(a => a.MessageId == 1);

                Assert.NotNull(SavedMessage);
            }
        }
        [Fact]
        public void GetMessages_TwoAccountId_ReturnListOfMessages()
        {
            using (var context = new InnerCircleDataContext(ContextOptions))
            {
                var MessageService = new MessageService(context);

                // Create a new message DTO
                var message = new MessageDTO
                {
                    RecepientId = 2,
                    SenderId = 1,
                    Message = "Hello"
                };
                MessageService.CreateMessage(message);

                message = new MessageDTO
                {
                    RecepientId = 1,
                    SenderId = 2,
                    Message = "Hello2"
                };
                MessageService.CreateMessage(message);

                message = new MessageDTO
                {
                    RecepientId = 1,
                    SenderId = 3,
                    Message = "Hello"
                };
                MessageService.CreateMessage(message);

                var Test = MessageService.GetMessages(1, 2);

                Assert.All<Message>(Test,m => Assert.True(m.SenderId == 1 || m.SenderId == 2 && 
                    (m.RecepientId == 1 || m.RecepientId == 2)));
            }
        }
    }
}
