using InnerCircleAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InnerCircleTests.RequestTests
{
    public class RequestTest
    {
        public readonly DbContextOptions<InnerCircleDataContext> ContextOptions;

        protected RequestTest(DbContextOptions<InnerCircleDataContext> contextOptions)
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

                for( int i = 0; i < 5; i++)
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

