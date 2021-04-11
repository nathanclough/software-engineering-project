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
    public class PostController : Controller
    {
        private readonly InnerCircleDataContext _context;
        private readonly PostService PostService;

        public PostController(InnerCircleDataContext context)
        {
            _context = context;
            PostService = new PostService(context);
        }

        [Authorize]
        [HttpPost]
        public  ActionResult<Post> CreatePost(PostDTO postDto)
        {
            // Set AccountId to the user AccountId given form auth
            var postAccountId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "AccountID").Value;

            // Parse the string claim for a long value
            long longAccountId;
            long.TryParse(postAccountId, out longAccountId);

            var post = new Post
            {
                MediaUrl = PostService.UploadMediaToBlob(postDto.Bytes,postDto.MediaExtension),
                Description = postDto.Description,
            };

            

            // Create the post 
            post = PostService.CreatePost(post, longAccountId);
            return Ok(post);
        }

        public  ActionResult<List<Post>> GetPosts(long id)
        {
            // Get the accountId of currentUser
            var stringTokenAccountId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "AccountID").Value;
            long tokenAccountId;
            long.TryParse(stringTokenAccountId, out tokenAccountId);

            var posts =  PostService.GetPosts(tokenAccountId, id);
            return posts;
        }
    }
}
