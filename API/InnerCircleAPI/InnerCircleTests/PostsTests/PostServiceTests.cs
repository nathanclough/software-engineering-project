﻿using InnerCircleAPI.Controllers;
using InnerCircleAPI.Models;
using InnerCircleAPI.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
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
        public void GetPosts_ViewerIsTheAccount_ReturnsPosts()
        {
            using (var context = new InnerCircleDataContext(ContextOptions))
            {

                /// Arrange 
                // Create a post service
                var postService = new PostService(context);

                //  Create a post for account 1 
                var post = new Post
                {
                    AccountId = 1,
                    Description = "Post Description",
                    MediaUrl = "UrlToMedia"
                };

                // Save post 
                postService.CreatePost(post, 1);

                /// Act
                // GetPosts where viewerId and accountId are 1 
                /// Act 
                // View account 1's posts as account 2 
                var posts = postService.GetPosts(1, 1);

                /// Assert
                // The posts are returned 
                Assert.True(posts.Count > 0);
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
                // Make sure correct amount of posts are returned
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

                // From the seed Account 3 has posts and is not in Account 1's circle 
                
                /// Act 
                // Have account 1 try to view account 3 posts 
                var posts = postService.GetPosts(1, 3);

                /// Assert 
                // Ensure post was created 
                Assert.True(posts.Count == 0);
            }
        }

        //[Fact]
        //public void UploadMediaToBlob_BytesAndExtension_MediaIsUploaded()
        //{
        //    using (var context = new InnerCircleDataContext(ContextOptions))
        //    {
        //        var postService = new PostService(context);
                
        //        postService.UploadMediaToBlob(File.ReadAllBytes("C:\\Users\\nathanc\\Documents\\NotificationsTODO.txt"),".txt");
        //    }

        //}

        [Fact]
        public void ParseDataURL_GivenValidJpegURL_ReturnsDictionary()
        {
            using (var context = new InnerCircleDataContext(ContextOptions))
            {
                /// Arrange 
                // Get post service 
                var postService = new PostService(context);
                // Get media url to convert 
                var mediaUrl = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4U+eRXhpZgAATU0AKgAAAAgADwALAAIAAAAmAAAIzgEPAAIAAAASAAAI9AEQAAIAAAAMAAAJBgESAAMA";
                /// Act 
                // Convert the media url 
                var result = postService.ParseDataURL(mediaUrl);
                var exception = Record.Exception(() => Convert.FromBase64String(result["data"]));

                /// Assert 
                // Ensure no exception is thrown when converting the string and the image type is correct  
                Assert.Null(exception);
                Assert.True(".jpg" == result["extension"]);
            }
        }

        [Fact]
        public void ParseDataURL_GivenValidPngUrl_ReturnsDictionary()
        {
            using (var context = new InnerCircleDataContext(ContextOptions))
            {
                /// Arrange 
                // Get post service 
                var postService = new PostService(context);
                // Get media url to convert 
                var mediaUrl = "data:image/png;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4U+eRXhpZgAATU0AKgAAAAgADwALAAIAAAAmAAAIzgEPAAIAAAASAAAI9AEQAAIAAAAMAAAJBgESAAMA";
                /// Act 
                // Convert the media url 
                var result = postService.ParseDataURL(mediaUrl);
                var exception = Record.Exception(() => Convert.FromBase64String(result["data"]));

                /// Assert 
                // Ensure no exception is thrown when converting the string and the image type is correct  
                Assert.Null(exception);
                Assert.True(".png" == result["extension"]);
            }
        }

        [Fact]
        public void ParseDataURL_GivenValidMp4Url_ReturnsDictionary()
        {
            using (var context = new InnerCircleDataContext(ContextOptions))
            {
                /// Arrange 
                // Get post service 
                var postService = new PostService(context);
                // Get media url to convert 
                var mediaUrl = "data:video/mp4;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4U+eRXhpZgAATU0AKgAAAAgADwALAAIAAAAmAAAIzgEPAAIAAAASAAAI9AEQAAIAAAAMAAAJBgESAAMA";
                /// Act 
                // Convert the media url 
                var result = postService.ParseDataURL(mediaUrl);
                var exception = Record.Exception(() => Convert.FromBase64String(result["data"]));

                /// Assert 
                // Ensure no exception is thrown when converting the string and the image type is correct  
                Assert.Null(exception);
                Assert.True(".mp4" == result["extension"]);
            }
        }

    }
}
