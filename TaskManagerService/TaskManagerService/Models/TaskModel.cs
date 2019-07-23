using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaskManagerService.Models
{
    public class TaskModel
    {
        public int TaskID { get; set; }
        public string Task { get; set; }
        public string ParentTask { get; set; }
        public int Priority { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }
    }
}