namespace ArtShare.WebApi.Requests;

public class ArtworkCreateRequest
{
    public IFormFile Image { get; set; } = null!;
    public string Description { get; set; } = "";
}

