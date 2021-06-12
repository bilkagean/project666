namespace api.DTOs
{
    public class NewWordsDto
    {
        public int UserId { get; set; }
        public string word { get; set; }
        public bool known { get; set; }
    }
}