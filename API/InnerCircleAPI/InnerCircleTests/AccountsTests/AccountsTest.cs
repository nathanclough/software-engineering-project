using InnerCircleAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InnerCircleTests.AccountsTests
{
    public class AccountsTest
    {
        public readonly DbContextOptions<InnerCircleDataContext> ContextOptions;

        protected AccountsTest(DbContextOptions<InnerCircleDataContext> contextOptions)
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
                }
            }
        }
}
