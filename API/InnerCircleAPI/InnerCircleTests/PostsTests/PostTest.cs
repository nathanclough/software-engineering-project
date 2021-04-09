using InnerCircleAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InnerCircleTests.PostsTests
{
    public class PostTest
    {
        public readonly DbContextOptions<InnerCircleDataContext> ContextOptions;

        protected PostTest(DbContextOptions<InnerCircleDataContext> contextOptions)
        {
            ContextOptions = contextOptions;
            Seed();
        }
        private void Seed()
        {
            using (var context = new InnerCircleDataContext(ContextOptions))
            {
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

                // Create 3 accounts 
                for (int i = 0; i < 3; i++)
                {
                    var account1 = new Account
                    {
                        Email = new Email
                        {
                            Value = $"Account{i}@email.com",
                        },
                        Username = new Username
                        {
                            Value = $"Account{i}Username"
                        },
                        Password = new Password
                        {
                            Value = "Password"
                        }
                    };

                    context.Add(account1);
                }
                context.SaveChanges();


                // Make accounts 1 and 2 members of circle 
                var CircleMember = new CircleMember() { CircleId = 1, AccountId = 2 };
                var CircleMember2 = new CircleMember() { CircleId = 2, AccountId = 2 };
                context.Add(CircleMember2);
                context.Add(CircleMember);

                context.SaveChanges();

                for (int i = 0; i < 3; i++)
                {
                    var post = new Post()
                    {
                        AccountId = 3,
                        Description = $"Post number {i} ",
                        MediaUrl = $"url{i}",
                        Username = $"Account3Username"
                    };
                    context.Add(post);
                    context.SaveChanges();
                }
            }
        }
    }
}

