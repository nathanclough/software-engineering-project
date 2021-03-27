using InnerCircleAPI.Models;
using InnerCircleAPI.Models.DTOs;
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
    public class PostController : Controller
    {
        private readonly InnerCircleDataContext _context;

        public PostController(InnerCircleDataContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Post>> CreatePost(Post post)
        {
            // Set AccountId to the user AccountId given form auth
            var postAccountId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "AccountID").Value;

            // Parse the string claim for a long value
            long longAccountId;
            long.TryParse(postAccountId, out longAccountId);

            // Set the value
            post.AccountId = longAccountId;

            // Add the new post 
            _context.Add(post);

            // Save changes and send OK response 
            await _context.SaveChangesAsync();
            return Ok(post);
        }

        public async Task<ActionResult<List<Post>>> GetPosts(long accountId)
        {
            // Get the accountId of currentUser
            var stringTokenAccountId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "AccountID").Value;
            long tokenAccountId;
            long.TryParse(stringTokenAccountId, out tokenAccountId);

            // Get the user account Circle
            var circle = _context.Circles.FirstOrDefault(c => c.AccountId == accountId);

            // If the account is not in the users circle 
            if(false)//circle.Accounts.Where( a=> a.AccountId == tokenAccountId).ToList().Count < 1)
            {
                // Return Unauthorized
                return Unauthorized();
            }
            else
            {
                // Return the posts
                return await _context.Posts.Where(p => p.AccountId == accountId).ToListAsync();
            }

        }
    }
}
