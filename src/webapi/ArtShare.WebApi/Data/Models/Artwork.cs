namespace ArtShare.WebApi.Data.Models;

public class Artwork
{
    public required string Id { get; set; }
    public string? Description { get; set; }
    public required string ImagePath { get; set; } = "/artworks/default.webp";
    public required string UserId { get; set; }
    public User? User { get; set; }
    public ICollection<Like> Likes { get; set; } = [];
    public ICollection<Comment> Comments { get; set; } = [];
    public DateTime CreatedAt { get; set; }
}
