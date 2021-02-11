using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InnerCircleAPI.Models
{
    public class Account
    {
        [Key]
        public long AccountId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public Password Password { get; set; }
        public Username Username { get;set; }
        public Account()
        {
            Password = new Password();
            Username = new Username();
        }
    }
}
