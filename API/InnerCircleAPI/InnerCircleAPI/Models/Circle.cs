using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InnerCircleAPI.Models
{
    public class Circle
    {
        [Key]
        public virtual long CircleId {get; set; }
        public virtual long AccountId { get; set; }
        public virtual Account Account { get; set; }
        public virtual List<Account> Accounts { get; set; }
        public Circle()
        {
            Accounts = new List<Account>();
        }
    }
}
