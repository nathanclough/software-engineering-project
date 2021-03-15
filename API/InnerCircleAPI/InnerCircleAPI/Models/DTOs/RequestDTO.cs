using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InnerCircleAPI.Models
{
    public class RequestDTO
    {
        public long RecepientId { get; set; }
        public long SenderId { get; set; }
        public string Status { get; set; }
    }
}
