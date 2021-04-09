using InnerCircleAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InnerCircleAPI.Services
{
    public class PostService
    {
        private readonly InnerCircleDataContext _context;
        public PostService(InnerCircleDataContext Context)
        {
            _context = Context;
        }

        public Post CreatePost(Post post, long AccountId)
        {
            // Set the value
            post.AccountId = AccountId;
            post.Username = _context.Usernames.FirstOrDefault(u => u.AccountID == AccountId).Value;

            // Add the new post 
            _context.Add(post);

            // Save changes 
            _context.SaveChanges();
            return post;
        }

        public List<Post> GetPosts(long viewerAccountId, long accountId)
        {
            // Get the user account Circle
            var circle = _context.Circles.Include(c => c.Members).FirstOrDefault(c => c.AccountId == accountId);

            // If the account is not in the users circle 
            if (circle.Members.Where(a => a.AccountId == viewerAccountId).ToList().Count < 1)
            {
                // Return Empty list
                return new List<Post>();
            }
            else
            {
                // Return the posts
                return  _context.Posts.Where(p => p.AccountId == accountId).ToList();
            }
        }
    }
}
