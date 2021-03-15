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
        public virtual Email Email { get; set; }
        public virtual Password Password { get; set; }
        public virtual Username Username { get; set; }
        public virtual Circle Circle {get; set;}
        public Account()
        {
            Password = new Password();
            Username = new Username();
            Email = new Email();
        }
    }
}
