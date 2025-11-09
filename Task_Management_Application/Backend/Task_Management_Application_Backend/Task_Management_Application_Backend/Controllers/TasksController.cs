using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Task_Management_Application_Backend.Data;
using Task_Management_Application_Backend.DTO;
using Task_Management_Application_Backend.Models;

namespace Task_Management_Application_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public TasksController(ApplicationDbContext context)
        {
            _context = context;
        }

       
        [HttpGet("GetAllTasks")]
        public async Task<ActionResult<IEnumerable<TaskModel>>> GetAllTasks()
        {
            try
            {
                var tasks = await _context.TaskRecords.ToListAsync();

                if (tasks == null || !tasks.Any())
                {
                    return Ok ("No Record Found" );
                }

                TimeZoneInfo istZone = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");

                foreach (var task in tasks)
                {
                    task.CreatedAt = TimeZoneInfo.ConvertTimeFromUtc(task.CreatedAt, istZone);
                }

                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        
        
        [HttpPost("CreateTask")]
        public async Task<ActionResult> CreatedTask([FromBody] TaskDTO createTask)
        {
            try
            {
                var newTask = new TaskModel
                {
                    Title = createTask.Title,
                    Description = createTask.Description,
                    Status = createTask.Status,
                    CreatedAt = DateTime.UtcNow
                };

                await _context.TaskRecords.AddAsync(newTask);
                await _context.SaveChangesAsync();

                return Ok("Save Successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }


        
        [HttpDelete("DeleteTask/{id}")]
        public async Task<ActionResult> DeleteTask(int id)
        {
            try
            {
                var task = await _context.TaskRecords.FindAsync(id);
                if (task == null)
                {
                    return NotFound($"Task with ID {id} not found.");
                }
                _context.TaskRecords.Remove(task);
                await _context.SaveChangesAsync();
                return Ok("Task Deleted Successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }


        
        [HttpPut("UpdateTask/{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] TaskDTO updatedTask)
        {
            try
            {
                if (id != updatedTask.Id)
                {
                    return BadRequest("Task ID mismatch.");
                }

                var existingTask = await _context.TaskRecords.FindAsync(id);

                if (existingTask == null)
                {
                    return NotFound($"Task with ID {id} not found.");
                }

                existingTask.Title = updatedTask.Title;
                existingTask.Description = updatedTask.Description;
                existingTask.Status = updatedTask.Status;
                _context.Entry(existingTask).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return Ok("Updated Successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
            return Ok();
        }

    }
}