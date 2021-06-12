namespace api.Entities
{
    public class Words
    {
        public int Id { get; set; }
        public string Word { get; set; }
        public bool known { get; set; }
        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; }
       

    }
}