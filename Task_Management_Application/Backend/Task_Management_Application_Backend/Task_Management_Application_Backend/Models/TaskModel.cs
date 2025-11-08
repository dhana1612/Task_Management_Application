using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Task_Management_Application_Backend.Services;

namespace Task_Management_Application_Backend.Models
{
    public class TaskModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        public string? Description { get; set; }

        public Services.TaskStatus Status { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}
