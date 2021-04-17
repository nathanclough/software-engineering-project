using InnerCircleAPI.Models;
using InnerCircleAPI.Models.DTOs;
using InnerCircleAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InnerCircleAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : Controller
    {
        private readonly InnerCircleDataContext _context;
        private readonly MessageService MessageService;

        public MessageController(InnerCircleDataContext context)
        {
            _context = context;
            MessageService = new MessageService(context);
        }

        [Authorize]
        [HttpPost]
        public ActionResult<Message> CreateMessage(MessageDTO message)
        {
            var messageAccountId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "AccountID").Value;
            if(message.SenderId.ToString() != messageAccountId)
            {
                return Unauthorized();
            }
            else
            {
                MessageService.CreateMessage(message);
                return Ok();
            }

        }


        public ActionResult<List<Message>> GetPosts(long id)
        {
            // Get the accountId of currentUser
            var MessageTokenAccountId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "AccountID").Value;
            long tokenAccountId;
            long.TryParse(MessageTokenAccountId, out tokenAccountId);

            var message_list = MessageService.GetMessages(tokenAccountId, id);
            return message_list;
        }
    }
}
