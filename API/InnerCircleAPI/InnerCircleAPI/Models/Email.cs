using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InnerCircleAPI.Models
{
    public class Email
    {
        [Key]
        public long EmailID { get; set; }
        [ForeignKey("AccountID")]
        public long AccountID { get; set; }
        public string Value { get; set; }
    }
}
