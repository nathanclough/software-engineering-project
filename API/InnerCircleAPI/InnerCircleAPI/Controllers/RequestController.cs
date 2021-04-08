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
        private readonly RequestService RequestService;

        public RequestController(InnerCircleDataContext context)
        {
            _context = context;
            RequestService = new RequestService(context);
        }

        [Authorize]
        [HttpPost]
        public ActionResult PostRequest(RequestDTO requestDTO)
        {
            if (HttpContext.User.Claims.FirstOrDefault(c => c.Type == "AccountID").Value != requestDTO.SenderId.ToString())
                return Unauthorized();
            else
            {
                RequestService.SaveRequest(requestDTO);
                return Ok(requestDTO);
            }
        }

        [Authorize]
        [HttpGet]
        public ActionResult<List<RequestDTO>> GetRequests()
        {
            long userId;
            long.TryParse(HttpContext.User.Claims.FirstOrDefault(c => c.Type == "AccountID").Value, out userId);          
            return RequestService.GetRequests(userId);
        }

        [Authorize]
        [Route ("respond")]
        [HttpPost]
        public ActionResult RequestResponse(long requestID, string status)
        {
            
            RequestService.RespondToRequest(requestID, status);
            return Ok();
        }
    }
}
