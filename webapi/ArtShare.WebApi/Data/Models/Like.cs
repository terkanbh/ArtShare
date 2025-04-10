namespace ArtShare.WebApi.Data.Models;

public class Like
{
    public required string Id { get; set; }
    public required string UserId { get; set; }
    public User? User { get; set; }
    public required string ArtworkId { get; set; }
    public Artwork? Artwork { get; set; }
    public DateTime CreatedAt { get; set; }
}
