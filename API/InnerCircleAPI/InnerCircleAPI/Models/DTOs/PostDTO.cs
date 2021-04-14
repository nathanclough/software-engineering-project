using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InnerCircleAPI.Models.DTOs
{
    public class PostDTO
    {
        public long PostId { get; set; }
        public string Bytes { get; set; }
        public string MediaExtension { get; set; }
        public string MediaUrl { get; set; }
        public string Username { get; set; }
        public string Description { get; set; }
    }
}
