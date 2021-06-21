using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs;
using api.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    public class WordsController:BaseApiController
    {
        private readonly Data.DataContext _context;
        private readonly Interfaces.ITokenService _tokenService;
        private readonly IMapper _mapper; 
        public WordsController(Data.DataContext context, Interfaces.ITokenService tokenService, IMapper mapper)
        {
            _tokenService = tokenService;
            _context = context;
            _mapper = mapper;
        }

        char[] seps= {'0', '1','2','3','4','5','6','7','8','9',' ','%','&','-','*','/','#','$', '?', '!', '.', ',' ,';', ':', '-', '(', ')', '[', ']', '}', '{', '\t', '\n', '\'', '\"', '\\', '\0', '\a', '\b','\f','\n','\t','\v'};

        [HttpPost("save")]
        public async Task<ActionResult<UserDto>> WordsAdder(NewWordsDto newWordsDto )
        { 
            if(await WordAlready(newWordsDto.word, newWordsDto.UserId))
            {
                return Ok("word already listed");
            }
            else
            {
                Words words = new Words
                {
                    AppUserId = newWordsDto.UserId,
                    Word = newWordsDto.word,
                    known =  newWordsDto.known
                };
                _context.Words.Add(words);
                await _context.SaveChangesAsync();
            };
            return Ok();
        }
        [HttpGet("known/{UserId}")]
        public async Task<ActionResult<IEnumerable<GetWordsDto>>> GetWordsKnown(int UserId)
        {
            return await _context.Words.Where(u => u.AppUserId == UserId && u.known == true)
            .ProjectTo<GetWordsDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
            
        }

        [HttpGet("unknown/{UserId}")]
         public async Task<ActionResult<IEnumerable<GetWordsDto>>> GetWordsUnknown(int UserId)
        {
            return await _context.Words.Where(u => u.AppUserId == UserId && u.known == false)
            .ProjectTo<GetWordsDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
            
        }
        //getonlywords endpointini koy.   

         [HttpGet("knownOnlyWords/{UserId}")]
        public async Task<ActionResult<IEnumerable<onlyWordsDto>>> GetOnlyWordsKnown(int UserId)
        {
            return await _context.Words.Where(u => u.AppUserId == UserId && u.known == true)
            .ProjectTo<onlyWordsDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
            
        }         

        [HttpGet("all")]
         public async Task<ActionResult<IEnumerable<GetWordsDto>>> GetWordsAll()
        {
            return await _context.Words.Where(x=>x.known==false).OrderBy(x=> x.Id).TakeLast(20)
            .ProjectTo<GetWordsDto>(_mapper.ConfigurationProvider).ToListAsync();
            
        }
        [HttpGet("update/addknown/{word}/{UserId}")]
        public async Task<ActionResult<IEnumerable<onlyWordsDto>>> UpdateToKnown (string word,int UserId)
        { 
             Words wordD = _context.Words.First(x => x.AppUserId == UserId&& x.Word==word&&x.known==false);
             wordD.known =true;
             _context.SaveChanges();
            
            return Ok();
        }      
         [HttpDelete("update/delete/{word}/{UserId}")]
       public string DeleteEmploye(int UserId, string word) 
       {  
              Words wordD = _context.Words.Where(x => x.AppUserId == UserId&&x.Word==word&&x.known==true).Single < Words > ();  
              _context.Words.Remove(wordD);  
              _context.SaveChanges();  
              return "Record has successfully Deleted";  
    } 

         [HttpPost("gettext")] ////////burada çalış
        public async Task<ActionResult<string[]>> WordsAdder(string textstring, int userid )
        {
           string x = textstring;
           x.ToLower();
           string[]userknownwords=_context.Words.Where(u => u.AppUserId == userid && u.known == true).Select(x => x.Word).ToArray();         //get user knownwords by id 
           string[]y=x.Split(seps, System.StringSplitOptions.RemoveEmptyEntries);
           y.Except(userknownwords);
           
           return y;
           
        }
        

        private async Task<bool> WordAlready(string word, int id)
        {
            return await _context.Words.Where(c => c.AppUserId == id).AnyAsync(w => w.Word ==word);
        }
    };
}