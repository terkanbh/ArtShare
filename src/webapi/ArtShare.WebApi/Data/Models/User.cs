using Microsoft.AspNetCore.Identity;

namespace ArtShare.WebApi.Data.Models;

public class User : IdentityUser
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public string ImagePath { get; set; } = "/users/default.webp";
    public ICollection<Artwork> Artworks { get; set; } = [];
    public ICollection<Comment> Comments { get; set; } = [];
    public DateTime CreatedAt { get; set; }

    public override string? UserName { get => Email; set => Email = value; }
}
