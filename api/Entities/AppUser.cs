using System;
using System.Collections.Generic;
using api.Extensions;

namespace api.Entities
{
    public class AppUser
    {
       public int Id {get;set;}
       public string UserName{get;set;}
       public byte[] PasswordHash{get;set;}
       public byte[] PasswordSalt{get;set;}
       public DateTime Created{get;set;}= DateTime.Now;
       public DateTime LastActive {get;set;}= DateTime.Now;
       public ICollection<Words> Words {get;set;}
       
    }
}

      