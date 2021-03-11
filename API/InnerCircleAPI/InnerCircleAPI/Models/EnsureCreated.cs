using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InnerCircleAPI.Models
{
    public static class DbInitializer
    {
        public static void Initialize(InnerCircleDataContext context)
        {
            context.Database.EnsureCreated();
        }
    }
}
