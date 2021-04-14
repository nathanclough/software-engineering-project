using InnerCircleAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using System.Threading.Tasks;
using System.IO;
using System.Text.RegularExpressions;

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

            // If the account is not in the users circle and account in view is not users account  
            if (circle.Members.Where(a => a.AccountId == viewerAccountId).ToList().Count > 0 || (accountId == viewerAccountId))
            {
                // Return the posts
                return _context.Posts.Where(p => p.AccountId == accountId).ToList();
            }
            else
            {
                // Return Empty list
                return new List<Post>();
            }
        }

        public string UploadMediaToBlob(Byte [] bytes, string mediaExtension)
        {
            string connectionString = Environment.GetEnvironmentVariable("AZURE_STORAGE_CONNECTION_STRING");
            BlobServiceClient blobServiceClient = new BlobServiceClient(connectionString);

            BlobContainerClient containerClient =  blobServiceClient.GetBlobContainerClient("media");

            var blobName = $"{Guid.NewGuid()}{mediaExtension}";

            BlobClient blobClient = containerClient.GetBlobClient(blobName);
            
            using MemoryStream memoryStream = new MemoryStream(bytes, writable: false);
            {
                var response = blobClient.Upload(memoryStream);
                return blobName;
            }
            
        }

        public Dictionary<string,string> ParseDataURL(string dataUrl)
        {
            var matches = Regex.Match(dataUrl, @"data:(?<type>.+?),(?<data>.+)");
            var base64 = matches.Groups["data"].Value;
            var mediaType = matches.Groups["type"].Value;

            return new Dictionary<string, string>() {
                { "data", base64 },
                { "extension", ".jpg"}
            };
        }
    }
}
