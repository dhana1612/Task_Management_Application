namespace Task_Management_Application_Backend.DTO
{
    public class TaskDTO
    {
        public int Id { get; set; }
        public string? Title { get; set; }

        public string? Description { get; set; }

        public Services.TaskStatus Status { get; set; }

    }
}
