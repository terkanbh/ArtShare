namespace ArtShare.WebApi.Requests;

public class CommentCreateRequest
{
    public string ArtworkId { get; set; } = "";
    public string Text { get; set; } = "";
}