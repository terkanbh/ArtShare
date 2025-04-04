using ArtShare.WebApi.Data.Models;

namespace ArtShare.WebApi.Utilities;

public static class ResponseMapper
{
    public const string BaseUrl = "http://localhost:5000/images";

    public static object Map(Artwork artwork)
    {
        return new
        {
            artwork.Id,
            artwork.Description,
            ImageUrl = $"{BaseUrl}{artwork.ImagePath}",
            artwork.UserId,
            TotalLikes = artwork.Likes.Count,
            TotalComments = artwork.Comments.Count,
            artwork.CreatedAt
        };
    }

    public static object Map(ICollection<Comment> comments)
    {
        return comments.Select(c => new
        {
            c.Id,
            c.Text,
            c.CreatedAt,
            User = Map(c.User!)
        });
    }

    public static object Map(User user)
    {
        return new
        {
            user.Id,
            user.FirstName,
            user.LastName,
            user.Email,
            ImageUrl = $"{BaseUrl}{user.ImagePath}" 
        };
    }

    public static object MapError(string message, string[] errors)
    {
        return new { message, errors };
    }
}