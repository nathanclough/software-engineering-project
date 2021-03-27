using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InnerCircleAPI.Models
{
    public class Post
    {
        public long PostId { get; set; }
        public string MediaUrl { get; set; }
        public long AccountId { get; set; }
        public string Description { get; set; }
    }
}
