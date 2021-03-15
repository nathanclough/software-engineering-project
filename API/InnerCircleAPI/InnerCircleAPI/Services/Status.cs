using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InnerCircleAPI.Services
{
    public enum Status
    {
        [Description("Pending")]
        Pending = 1,
        [Description("Accepted")]
        Accepted = 2,
        [Description("Denied")]
        Denied = 3
    }
}
