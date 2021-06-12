using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class DataContext: DbContext
    {

        public DataContext(DbContextOptions options) :base(options){

        }
        public DbSet<Entities.AppUser> Users {get;set;}
        public DbSet<Entities.Words> Words {get;set;}
        
    }
}