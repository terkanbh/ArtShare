namespace ArtShare.WebApi.Requests;

public class UserUpdateRequest
{
    public string Email { get; set; } = "";
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
}