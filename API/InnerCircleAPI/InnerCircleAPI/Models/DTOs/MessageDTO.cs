using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InnerCircleAPI.Models.DTOs
{
    public class MessageDTO
    {
        public long MessageId { get; set; }
        public long RecepientId { get; set; }
        public long SenderId { get; set; }
        public string Message { get; set; }
        public DateTime Time { get; set; }
    }
}
