using InnerCircleAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InnerCircleTests.MessageTests
{
    public class MessageTest
    {
        public readonly DbContextOptions<InnerCircleDataContext> ContextOptions;

        protected MessageTest(DbContextOptions<InnerCircleDataContext> contextOptions)
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
                for (int i = 0; i < 5; i++)
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
                    context.SaveChanges();
                }
            }
        }
    }
}