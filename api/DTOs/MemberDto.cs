using System;
using System.Collections.Generic;
using api.Entities;

namespace api.DTOs
{
    public class MemberDto
    {
       public int Id {get;set;}
       public string Username{get;set;}
       public DateTime Created{get;set;}
       public DateTime LastActive {get;set;}
       public ICollection<Words> Words {get;set;}
        
    }
}