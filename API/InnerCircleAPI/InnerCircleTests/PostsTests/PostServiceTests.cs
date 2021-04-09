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

namespace InnerCircleTests.PostsTests
{
    public class PostServiceTests : PostTest
    {
        public PostServiceTests() : base(new DbContextOptionsBuilder<InnerCircleDataContext>()
            .UseSqlite("Filename=PostTest.db").Options)
        {

        }

        [Fact]
        public void CreatePost_PassedValidPost_PostIsCreated()
        {
            using (var context = new InnerCircleDataContext(ContextOptions))
            {
                /// Arrange 
                // Create a post service
                var postService = new PostService(context);

                // Create a post (1 is account in seeded database) 
                var post = new Post
                {
                    AccountId = 1,
                    Description = "Post Description",
                    MediaUrl = "UrlToMedia"
                };

                /// Act 
                // Save post 
                postService.CreatePost(post, 1);

                /// Assert 
                // Ensure post was created 
                Assert.NotNull(context.Posts.FirstOrDefault(p => p.AccountId == 1));
            }
        }

        [Fact]
        public void GetPosts_ViewerIsInAccountCircle_ReturnsPosts()
        {
            using (var context = new InnerCircleDataContext(ContextOptions))
            {
                /// Arrange 
                // Create a post service
                var postService = new PostService(context);

                // Create a post (1 is account in seeded database) 
                var post = new Post
                {
                    AccountId = 1,
                    Description = "Post Description",
                    MediaUrl = "UrlToMedia"
                };

                // Save post 
                postService.CreatePost(post, 1);

                /// Act 
                // View account 1's posts as account 2 
                var posts = postService.GetPosts(2, 1);

                /// Assert 
                // Ensure post was created 
                Assert.True(posts.Count >0);
            }
        }

        [Fact]
        public void GetPosts_ViewerIsNotInCircle_ReturnsEmptyList()
        {
            using (var context = new InnerCircleDataContext(ContextOptions))
            {
                /// Arrange 
                // Create a post service
                var postService = new PostService(context);

                // From the seed Account 3 is not in Account 1 circle and has posts
                
                /// Act 
                // Have account 1 try to view account 3 posts 
                var posts = postService.GetPosts(1, 3);

                /// Assert 
                // Ensure post was created 
                Assert.True(posts.Count == 0);
            }
        }

    }
}
