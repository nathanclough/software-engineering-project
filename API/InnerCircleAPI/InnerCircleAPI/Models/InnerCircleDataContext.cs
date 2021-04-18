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
        public DbSet<Email> Emails { get; set;  }
        public DbSet<CircleMember> CircleMembers { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Circle> Circles { get; set; }
        public DbSet<Message> Messages { get; set; }

        public InnerCircleDataContext(DbContextOptions<InnerCircleDataContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Circle>().HasKey(c => c.CircleId);

            modelBuilder.Entity<Circle>().HasMany(c => c.Members)
                .WithOne(c => c.Circle).HasForeignKey(c => c.CircleId).OnDelete(DeleteBehavior.ClientSetNull);
            
        }
    }
}
