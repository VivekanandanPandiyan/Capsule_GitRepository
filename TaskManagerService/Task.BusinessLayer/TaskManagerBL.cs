using System;
using System.Collections.ObjectModel;
using System.Linq;
using Task.DataAccessLayer;

namespace Task.BusinessLayer
{
    public class TaskManagerBL
    {
        public Collection<TaskBL> GetTask()
        {
            using (var taskManager = new TaskManagerEntities())
            {
                Collection<TaskBL> taskCollection = new Collection<TaskBL>();

                taskManager.tblTasks
                   .Select(t => new TaskBL()
                   {
                       TaskID = t.TaskID,
                       Task = t.Task,
                       ParentTask = t.ParentTask,
                       Priority = t.Priority,
                       StartDate = t.StartDate,
                       EndDate = t.EndDate,
                       IsActive = t.IsActive
                   })
                   .ToList()
                   .ForEach(y => taskCollection.Add(y));
                return taskCollection;
            }
        }

        public Collection<string> GetParentTasks()
        {
            using (var taskManager = new TaskManagerEntities())
            {
                Collection<string> taskCollection = new Collection<string>();

                taskManager.tblTasks
                   .Select(t => t.Task).ToList()
                   .ForEach(y => taskCollection.Add(y));

                return taskCollection;
            }
        }

        public TaskBL GetTaskById(int taskId)
        {
            using (var taskManager = new TaskManagerEntities())
            {
                TaskBL task = new TaskBL();
                task = taskManager.tblTasks
                    .Where(x => x.TaskID == taskId)
                    .Select(t => new TaskBL()
                    {
                        Task = t.Task,
                        ParentTask = t.ParentTask,
                        Priority = t.Priority,
                        StartDate = t.StartDate,
                        EndDate = t.EndDate,
                        IsActive = t.IsActive
                    }).FirstOrDefault();

                return task;
            }
        }
        public void AddTask(TaskBL task)
        {
            using (var taskManager = new TaskManagerEntities())
            {
                tblTask tTask = new tblTask
                {
                    Task = task.Task,
                    ParentTask = task.ParentTask,
                    Priority = task.Priority,
                    StartDate = task.StartDate,
                    EndDate = task.EndDate,
                    IsActive = true
                };

                taskManager.tblTasks.Add(tTask);
                taskManager.SaveChanges();
            }
        }

        public void UpdateTask(TaskBL task)
        {
            using (var taskManager = new TaskManagerEntities())
            {
                var tTask = taskManager.tblTasks.Where(t => t.TaskID == task.TaskID).FirstOrDefault();
                if (tTask != null)
                {
                    tTask.ParentTask = task.ParentTask;
                    tTask.Priority = task.Priority;
                    tTask.StartDate = task.StartDate;
                    tTask.EndDate = task.EndDate;
                    taskManager.SaveChanges();
                }
            }
        }

        public void EndTask(int taskId)
        {
            using (var taskManager = new TaskManagerEntities())
            {
                var task = taskManager.tblTasks.Where(t => t.TaskID == taskId).FirstOrDefault();
                if (task != null)
                {
                    task.EndDate = DateTime.Now;
                    task.IsActive = false;
                    taskManager.SaveChanges();
                }
            }
        }
    }

    public class TaskBL
    {
        public int TaskID { get; set; }
        public string Task { get; set; }
        public string ParentTask { get; set; }
        public int Priority { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }
    }

    public class SearchTask
    {
        public string Task { get; set; }
        public string ParentTask { get; set; }
        public int? PriorityFrom { get; set; }
        public int? PriorityTo { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
