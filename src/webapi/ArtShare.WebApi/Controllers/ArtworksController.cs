using System.Security.Claims;
using ArtShare.WebApi.Data;
using ArtShare.WebApi.Data.Models;
using ArtShare.WebApi.Requests;
using ArtShare.WebApi.Utilities;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArtShare.WebApi.Controllers;

[ApiController]
public class ArtworksController(ArtShareDbContext context, IValidator<ArtworkCreateRequest> validator) : Controller
{
    [HttpGet]
    [Route("/api/artworks")]
    public IActionResult GetArtworksWithUser()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var artworks = context.Artworks
            .Include(a => a.User)
            .Include(a => a.Likes)
            .Include(a => a.Comments)
            .Select(a => new
            {
                Artwork = ResponseMapper.Map(a),
                User = ResponseMapper.Map(a.User!),
                LikedByCurrentUser = userId != null && a.Likes.Any(l => l.UserId == userId)
            });

        return Ok(artworks);
    }

    [HttpGet]
    [Route("/api/artworks/{id}")]
    public IActionResult GetArtworkWithUserAndComments(string id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var artwork = GetArtworkWithUserAndCommentsResponse(id, userId);

        if (artwork is null) return NotFound();

        return Ok(artwork);
    }

    [HttpPost]
    [Authorize]
    [Route("/api/artworks/toggle-like/{id}")]
    public async Task<IActionResult> ToggleLike(string id)
    {
        // Get user ID from claims
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId is null) return Unauthorized();

        // Fetch artwork and likes
        var artwork = await context.Artworks
            .Include(a => a.Likes)
            .SingleOrDefaultAsync(a => a.Id == id);

        if (artwork is null)
        {
            return NotFound();
        }

        // Check if user has already liked the artwork
        var existingLike = artwork.Likes.FirstOrDefault(l => l.UserId == userId);

        string actionTaken;

        if (existingLike is not null)
        {
            // User already liked → unlike
            context.Likes.Remove(existingLike);
            actionTaken = "unliked";
        }
        else
        {
            // User has not liked → like
            var newLike = new Like
            {
                Id = Guid.NewGuid().ToString(),
                UserId = userId,
                ArtworkId = id
            };

            artwork.Likes.Add(newLike);
            actionTaken = "liked";
        }

        try
        {
            await context.SaveChangesAsync();
        }
        catch (Exception)
        {
            return StatusCode(500, ResponseMapper.MapError("An error occurred while toggling the like.", []));
        }

        // Get total likes
        var totalLikes = artwork.Likes.Count;

        return Ok(new
        {
            ArtworkId = id,
            UserId = userId,
            Status = actionTaken,
            TotalLikes = totalLikes
        });
    }

    [HttpPost]
    [Authorize]
    [Route("/api/artworks")]
    public async Task<IActionResult> Create(ArtworkCreateRequest req)
    {
        // Get user ID from claims
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId is null) return Unauthorized();

        var validationResult = validator.Validate(req);

        if (!validationResult.IsValid) return BadRequest(validationResult.Errors);

        var newArtworkId = Guid.NewGuid().ToString();
        var savePath = "wwwroot/images/artworks";

        Directory.CreateDirectory(savePath);

        var filePath = Path.Combine(savePath, $"{newArtworkId}.webp");
        using var stream = new FileStream(filePath, FileMode.Create);
        await req.Image.CopyToAsync(stream);

        context.Artworks.Add(new Artwork
        {
            Id = newArtworkId,
            UserId = userId,
            Description = req.Description,
            ImagePath = $"/artworks/{newArtworkId}.webp",
            CreatedAt = DateTime.Now
        });

        await context.SaveChangesAsync();

        var createdArtwork = GetArtworkWithUserAndCommentsResponse(newArtworkId, userId);

        return Ok(createdArtwork);
    }

    [HttpGet]
    [Route("/api/artworks/checkOwnership/{id}")]
    public IActionResult CheckOwnership(string id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userId is null) return Unauthorized();

        var artwork = context.Artworks.Find(id);

        if (artwork is null) return NotFound();

        if (artwork.UserId != userId) return Unauthorized();

        return Ok();
    }

    private object? GetArtworkWithUserAndCommentsResponse(string artworkId, string? currentUserId)
    {
        var artwork = context.Artworks
            .Where(a => a.Id == artworkId)
            .Include(a => a.User)
            .Include(a => a.Likes)
            .Include(a => a.Comments)
            .ThenInclude(c => c.User)
            .Select(a => new
            {
                Artwork = ResponseMapper.Map(a),
                User = ResponseMapper.Map(a.User!),
                Comments = ResponseMapper.Map(a.Comments),
                LikedByCurrentUser = currentUserId != null && a.Likes.Any(l => l.UserId == currentUserId)
            })
            .FirstOrDefault();

        return artwork;
    }
}
