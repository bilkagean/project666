namespace api.Interfaces
{
    public interface ITokenService
    {
         string CreateToken(Entities.AppUser user);
    }
}