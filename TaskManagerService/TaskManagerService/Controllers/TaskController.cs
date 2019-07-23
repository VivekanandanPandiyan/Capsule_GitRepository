using System.Collections.ObjectModel;
using System.Linq;
using System.Web.Http;
using Task.BusinessLayer;
using TaskManagerService.Models;

namespace TaskManagerService.Controllers
{
    [RoutePrefix("api/Task")]
    public class TaskController : ApiController
    {
        private TaskManagerBL taskManagerBL = null;
        public TaskController()
        {
            taskManagerBL = new TaskManagerBL();
        }

        [HttpGet]
        [Route("GetTasks")]
        public IHttpActionResult GetTasks()
        {
            Collection<TaskModel> tasks = new Collection<TaskModel>();

            var blTasks = taskManagerBL.GetTask();
            blTasks.ToList().ForEach(
               x => tasks.Add(
                   new TaskModel
                   {
                       TaskID = x.TaskID,
                       Task = x.Task,
                       ParentTask = x.ParentTask ?? "",
                       Priority = x.Priority,
                       StartDate = x.StartDate,
                       EndDate = x.EndDate,
                       IsActive = x.IsActive
                   }));

            return Ok(tasks);
        }

        [HttpGet]
        [Route("GetParentTasks")]
        public IHttpActionResult GetParentTasks()
        {
            Collection<string> tasks = new Collection<string>();

            var blTasks = taskManagerBL.GetParentTasks();
            blTasks.ToList().ForEach(x => tasks.Add(x));

            return Ok(tasks);
        }

        [HttpGet]
        [Route("GetTasks/{taskId}")]
        public IHttpActionResult GetTaskById(int taskId)
        {
            TaskModel task = new TaskModel();

            var blTasks = taskManagerBL.GetTaskById(taskId);
            if (blTasks != null)
            {
                task = new TaskModel
                {
                    TaskID = blTasks.TaskID,
                    Task = blTasks.Task,
                    ParentTask = blTasks.ParentTask,
                    Priority = blTasks.Priority,
                    StartDate = blTasks.StartDate,
                    EndDate = blTasks.EndDate,
                    IsActive = blTasks.IsActive
                };
            }
            return Ok(task);
        }

        [HttpPost]
        [Route("AddTask")]
        public IHttpActionResult AddTask([FromBody]TaskModel task)
        {
            TaskBL blTask = new TaskBL
            {
                Task = task.Task,
                ParentTask = task.ParentTask,
                Priority = task.Priority,
                StartDate = task.StartDate,
                EndDate = task.EndDate
            };
            taskManagerBL.AddTask(blTask);
            return Ok();
        }

        [HttpPost]
        [Route("UpdateTask")]
        public void UpdateTask([FromBody]TaskModel task)
        {
            TaskBL blTask = new TaskBL
            {
                TaskID = task.TaskID,
                ParentTask = task.ParentTask,
                Priority = task.Priority,
                StartDate = task.StartDate,
                EndDate = task.EndDate
            };

            taskManagerBL.UpdateTask(blTask);
        }

        [HttpPost]
        [Route("EndTask")]
        public void EndTask([FromBody]int taskId)
        {
            taskManagerBL.EndTask(taskId);
        }
    }
}