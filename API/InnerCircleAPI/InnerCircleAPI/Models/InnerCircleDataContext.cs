using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using InnerCircleAPI.Models;

namespace InnerCircleAPI.Models
{
    public class InnerCircleDataContext : DbContext
    {
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Password> Passwords { get; set; }
        public DbSet<Username> Usernames { get; set; }
        public InnerCircleDataContext(DbContextOptions<InnerCircleDataContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Password>().HasNoKey();
            modelBuilder.Entity<Username>().HasNoKey();
            modelBuilder.Entity<Account>().HasOne(a => a.Password);
            modelBuilder.Entity<Account>().HasOne(a => a.Username);
        }
    }
}
