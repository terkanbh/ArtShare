using ArtShare.WebApi.Data.Models;

namespace ArtShare.WebApi.Utilities;

public static class ResponseMapper
{
    public static object Map(User user)
    {
        return new
        {
            user.Id, user.FirstName, user.LastName, user.Email, user.ImagePath 
        };
    }

    public static object MapError(string message, string[] errors)
    {
        return new { message, errors };
    }
}