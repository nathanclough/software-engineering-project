using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InnerCircleAPI.Models
{
    public class Request
    {
        public virtual long RequestId { get; set; }
        public virtual long SenderId { get; set; }
        public virtual long RecepientId { get; set; }
        public virtual Status status { get; set; }
    }
}
