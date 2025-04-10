using System.Security.Claims;
using ArtShare.WebApi.Data;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArtShare.WebApi.Controllers;

[ApiController]
public class ImagesController(
    ArtShareDbContext context,
    IValidator<IFormFile?> validator) : ControllerBase
{
    private readonly ArtShareDbContext context = context;

    [HttpPost]
    [Route("/api/images/artworks/{id}")]
    public async Task<IActionResult> UploadImage(string id, IFormFile image)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId is null) return Unauthorized();

        var artwork = await context.Artworks.FindAsync(id);

        if (artwork is null) return NotFound();
        if (artwork.UserId != userId) return Forbid();

        var validationResult = validator.Validate(image);
        if (!validationResult.IsValid) return BadRequest(new {Errors = new[] {validationResult.Errors}});

        var imagePath = $"artworks/{id}.webp";

        try { await SaveImageAsync(imagePath, image); }
        catch { return StatusCode(500); }

        artwork.ImagePath = '/' + imagePath;

        try { await context.SaveChangesAsync(); }
        catch { return StatusCode(500); }

        return Ok(new { message = "Image uploaded successfully", artwork.ImagePath });
    }

    [HttpDelete]
    [Route("/api/images/artworks/{id}")]
    public async Task<IActionResult> DeleteArtworkImage(string id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId is null) return Unauthorized();

        var artwork = await context.Artworks.FindAsync(id);

        if (artwork is null) return NotFound();
        if (artwork.UserId != userId) return Forbid();

        var imagePath = $"artworks/{id}.webp";;

        try { DeleteImageFile(imagePath); }
        catch { return StatusCode(500); }

        artwork.ImagePath = "/artworks/default.webp";

        try { await context.SaveChangesAsync(); }
        catch { return StatusCode(500); }

        return Ok(new { message = "Image deleted successfully", artwork.ImagePath });
    }

    [HttpPost]
    [Route("/api/images/users/{id}")]
    public async Task<IActionResult> UploadUserImage(string id, IFormFile image)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId is null) return Unauthorized();

        var user = await context.Users.FindAsync(id);

        if (user is null) return StatusCode(500);
        if (user.Id != userId) return Forbid();

        var validationResult = validator.Validate(image);
        if (!validationResult.IsValid) return BadRequest(new {Errors = new[] {validationResult.Errors}});

        var imagePath = $"users/{id}.webp";

        try { await SaveImageAsync(imagePath, image); }
        catch { return StatusCode(500); }

        user.ImagePath = '/' + imagePath;

        try { await context.SaveChangesAsync(); }
        catch { return StatusCode(500); }

        return Ok(new { message = "Image uploaded successfully", user.ImagePath });
    }

    [HttpDelete]
    [Route("/api/images/users/{id}")]
    public async Task<IActionResult> DeleteUserImage(string id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId is null) return Unauthorized();

        var user = await context.Users.FindAsync(id);

        if (user is null) return StatusCode(500);
        if (user.Id != userId) return Forbid();

        var imagePath = $"users/{id}.webp";;

        try { DeleteImageFile(imagePath); }
        catch { return StatusCode(500); }

        user.ImagePath = "/users/default.webp";

        try { await context.SaveChangesAsync(); }
        catch { return StatusCode(500); }

        return Ok(new { message = "Image deleted successfully", user.ImagePath });
    }

    private static void DeleteImageFile(string imagePath)
    {
        var filePath = Path.Combine("wwwroot/images", imagePath);

        if (System.IO.File.Exists(filePath))
        {
            System.IO.File.Delete(filePath);
        }
    }

    private static async Task SaveImageAsync(string imagePath, IFormFile image)
    {
        var savePath = "wwwroot/images";
        Directory.CreateDirectory(savePath);

        var filePath = Path.Combine(savePath, imagePath);

        using var stream = new FileStream(filePath, FileMode.Create);
        await image.CopyToAsync(stream);
    }
}
