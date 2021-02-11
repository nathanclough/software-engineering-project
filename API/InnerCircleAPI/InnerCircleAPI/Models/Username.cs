using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace InnerCircleAPI.Models
{
    public class Username
    {
        [ForeignKey("AccountID")]
        public long AccountID { get; set; }
        public string Value { get; set; }
    }
}
