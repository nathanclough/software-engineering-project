using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InnerCircleAPI.Models
{
    public class CircleMember
    {
        public virtual long CircleMemberId { get; set; }
        public virtual long CircleId { get; set; }
        public virtual long AccountId { get; set; }
        public virtual Account Account { get; set; }
        public virtual Circle Circle { get; set; }
        public CircleMember()
        {
        }
    }
}
