using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InnerCircleAPI.Models
{
    public class Circle
    {
        public virtual long AccountId { get; set; }
        public virtual long CircleId { get; set; }
        public virtual Account Account { get; set; }
        public virtual ICollection<CircleMember> Members { get; set; }
        public Circle() 
        {
            Members = new List<CircleMember>();
        }
    }
}
