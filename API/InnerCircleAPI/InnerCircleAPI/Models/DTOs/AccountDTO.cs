using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InnerCircleAPI.Models.DTOs
{
    public class AccountDTO
    {
        public long AccountId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public  string Email { get; set; }
        public  string Password { get; set; }
        public  string Username { get; set; }
        public bool Requestable { get; set; }
    }
}
