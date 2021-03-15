using InnerCircleAPI.Models;
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

        //[Authorize]
        [HttpPost]
        public async Task<ActionResult<RequestDTO>> PostRequest(RequestDTO requestDTO)
        {
            //if (HttpContext.User.Claims.FirstOrDefault(c => c.Type == "AccountID").Value != requestDTO.SenderId.ToString())
            //    return Unauthorized();

            var request = new Request
            {
                RecepientId = requestDTO.RecepientId,
                SenderId = requestDTO.SenderId,
                status = new Status { value = "Pending" }
            };

            _context.Requests.Add(request);
            await _context.SaveChangesAsync();

            requestDTO.Status = "Pending";

            return Ok(requestDTO);
        }

        [HttpGet]
        public async Task<ActionResult<List<RequestDTO>>> GetRequests(){
            var requests = await _context.Requests.Include(r => r.status).Select(r => new RequestDTO {
                SenderId = r.SenderId,
                RecepientId = r.RecepientId,
                Status = r.status.value
            }).ToListAsync();

            return requests;
        }
    }
}
