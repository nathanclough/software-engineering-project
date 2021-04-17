using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InnerCircleAPI.Models
{
    public class Message
    {
        public virtual long MessageId { get; set; }
        public virtual long SenderId { get; set; }
        public virtual long RecepientId { get; set; }
        public virtual string message { get; set; }
        public virtual DateTime time { get; set; }
    }
}
