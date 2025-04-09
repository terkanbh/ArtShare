using System.Security.Claims;
using ArtShare.WebApi.Data;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArtShare.WebApi.Controllers;
[ApiController]
[Route("/api/images")]
public class ImagesController(
    ArtShareDbContext context,
    IValidator<IFormFile?> validator) : ControllerBase
{
    private readonly ArtShareDbContext context = context;

    [HttpPost]
    [Authorize]
    [Route("{artworkId}")]
    public async Task<IActionResult> UploadImage(string artworkId, IFormFile image)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId is null) return Unauthorized();

        var artwork = await context.Artworks.FirstOrDefaultAsync(a => a.Id == artworkId);
        if (artwork is null) return NotFound();
        if (artwork.UserId != userId) return Forbid();

        var validationResult = validator.Validate(image);
        if (!validationResult.IsValid) return BadRequest(validationResult.Errors);

        var savePath = "wwwroot/images/artworks";
        Directory.CreateDirectory(savePath);

        var filePath = Path.Combine(savePath, $"{artworkId}.webp");

        using var stream = new FileStream(filePath, FileMode.Create);
        await image.CopyToAsync(stream);

        artwork.ImagePath = $"/artworks/{artworkId}.webp";

        try
        {
            await context.SaveChangesAsync();
        }
        catch
        {
            return StatusCode(500);
        }

        return Ok(new { message = "Image uploaded successfully", artwork.ImagePath });
    }

    [HttpDelete]
    [Authorize]
    [Route("{artworkId}")]
    public async Task<IActionResult> DeleteImage(string artworkId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId is null) return Unauthorized();

        var artwork = await context.Artworks.FirstOrDefaultAsync(a => a.Id == artworkId);
        if (artwork is null) return NotFound();
        if (artwork.UserId != userId) return Forbid();

        var filePath = Path.Combine("wwwroot/images/artworks", $"{artworkId}.webp");

        if (System.IO.File.Exists(filePath))
        {
            System.IO.File.Delete(filePath);
        }

        artwork.ImagePath = "/artworks/default.webp";

        try
        {
            await context.SaveChangesAsync();
        }
        catch
        {
            return StatusCode(500);
        }

        return Ok(new { message = "Image deleted successfully", artwork.ImagePath });
    }
}
