using InnerCircleAPI.Models;
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
    public class RequestController : Controller
    {
        private readonly InnerCircleDataContext _context;

        public RequestController(InnerCircleDataContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<RequestDTO>> PostRequest(RequestDTO requestDTO)
        {
            if (HttpContext.User.Claims.FirstOrDefault(c => c.Type == "AccountID").Value != requestDTO.SenderId.ToString())
                return Unauthorized();

            var sender = _context.Usernames.FirstOrDefault(u => u.AccountID == requestDTO.SenderId);
            var recepient = _context.Usernames.FirstOrDefault(u => u.AccountID == requestDTO.RecepientId);

            var request = new Request
            {
                RecepientId = requestDTO.RecepientId,
                SenderId = requestDTO.SenderId,
                Status = "Pending"
            };

            _context.Requests.Add(request);
            await _context.SaveChangesAsync();

            return Ok(requestDTO);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<RequestDTO>>> GetRequests()
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "AccountID").Value;

            var requests = await _context.Requests.Select(r => new RequestDTO {
                SenderId = r.SenderId,
                RecepientId = r.RecepientId,
                Status = r.Status
                // Get pending requests involving the given user 
            }).Where(r =>( r.SenderId.ToString() == userId || r.RecepientId.ToString() == userId) && r.Status == "Pending").ToListAsync();

            foreach( var r in requests)
            {
                var recepient = await _context.Usernames.FirstOrDefaultAsync(u => r.RecepientId == u.AccountID);
                var sender = await _context.Usernames.FirstOrDefaultAsync(u => r.SenderId == u.AccountID);
                r.SenderUsername = sender.Value;
                r.RecepientUsername = recepient.Value;
            }

            return requests;
        }
    }
}
