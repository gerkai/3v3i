using Company.PunchlinePro.Identity.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;

namespace Company.PunchlinePro.Identity.Infrastructure
{
    public class ApplicationDbContext: DbContext
    {
        public DbSet<UserEntity> Users { get; set; }

        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                bool isDevelopment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development";

                string? connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION");

                if (isDevelopment || string.IsNullOrEmpty(connectionString))
                {
                    connectionString = $"Server=localhost;Initial Catalog=punchline-pro-db;Persist Security Info=False;User ID=sa;Password=zaq1@WSX;MultipleActiveResultSets=True;Encrypt=True;TrustServerCertificate=True;";
                }

                optionsBuilder.UseSqlServer(connectionString);
            }
        }
    }
}
