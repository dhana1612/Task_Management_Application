using Microsoft.EntityFrameworkCore;
using Task_Management_Application_Backend.Models;

namespace Task_Management_Application_Backend.Data
{
    public class ApplicationDbContext :DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> dbContext) : base(dbContext)
        {
            
        }

        public DbSet<TaskModel> TaskRecords { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<TaskModel>()
                .Property(t => t.Status)
                .HasConversion<string>();
        }
    }
}
