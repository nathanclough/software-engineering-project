using InnerCircleAPI.Models;
using InnerCircleAPI.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InnerCircleAPI.Services
{
    public class MessageService
    {
        private readonly InnerCircleDataContext _context;
        public MessageService(InnerCircleDataContext Context)
        {
            _context = Context;
        }

        public Message CreateMessage(MessageDTO message)
        {
            //set variables
            var m = new Message { RecepientId = message.RecepientId, SenderId = message.SenderId, message = message.Message, time = DateTime.Now};
            //Add to data Base
            _context.Add(m);
            //Save the Message
            _context.SaveChanges();
            return m;
        }
        public List<Message> GetMessages(long viewer_userId, long otherId)
        {
            // Get the user Messages
            var messages = _context.Messages.Where(c => (c.SenderId == viewer_userId && c.RecepientId ==otherId) 
                                                                || (c.SenderId == otherId && c.RecepientId == viewer_userId)).ToList();

            // If the account has messages
            if (messages != null)
            {
                // Return the messages
                return messages;
            }
            else
            {
                // Return Empty list
                return new List<Message>();
            }
        }
    }
}
