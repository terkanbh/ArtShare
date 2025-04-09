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
public class ArtworksController(
    ArtShareDbContext context,
    IValidator<ArtworkSaveRequest> validator) : Controller
{
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

    [HttpPost]
    [Authorize]
    [Route("/api/artworks")]
    public async Task<IActionResult> Create(ArtworkSaveRequest req)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId is null) return Unauthorized();

        var validationResult = validator.Validate(req);
        if (!validationResult.IsValid) return BadRequest(validationResult.Errors);

        var newArtworkId = Guid.NewGuid().ToString();
        context.Artworks.Add(new Artwork
        {
            Id = newArtworkId,
            UserId = userId,
            Description = req.Description,
            ImagePath = "/artworks/default.webp",
            CreatedAt = DateTime.Now
        });

        try
        {
            await context.SaveChangesAsync();
        }
        catch
        {
            return StatusCode(500);
        }

        var createdArtwork = GetArtworkWithUserAndCommentsResponse(newArtworkId, userId);
        return Ok(createdArtwork);
    }

    [HttpDelete]
    [Authorize]
    [Route("/api/artworks/{artworkId}")]
    public async Task<IActionResult> Delete(string artworkId)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId is null) return Unauthorized();

        var artwork = await context.Artworks.FindAsync(artworkId);
        if (artwork is null) return NotFound();
        if (artwork.UserId != userId) return Unauthorized();

        context.Artworks.Remove(artwork);

        try
        {
            await context.SaveChangesAsync();
        }
        catch
        {
            return StatusCode(500, ResponseMapper.MapError("An error occurred while deleting the artwork.", []));
        }

        return Ok(new { Message = "Artwork deleted successfully" });
    }

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
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId is null) return Unauthorized();

        var artwork = await context.Artworks
            .Include(a => a.Likes)
            .SingleOrDefaultAsync(a => a.Id == id);
        if (artwork is null) return NotFound();

        var existingLike = artwork.Likes.FirstOrDefault(l => l.UserId == userId);
        string actionTaken;

        if (existingLike is not null)
        {
            context.Likes.Remove(existingLike);
            actionTaken = "unliked";
        }
        else
        {
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

        return Ok(new
        {
            ArtworkId = id,
            UserId = userId,
            Status = actionTaken,
            TotalLikes = artwork.Likes.Count
        });
    }

    [HttpPut]
    [Authorize]
    [Route("/api/artworks/{artworkId}")]
    public async Task<IActionResult> Update(string artworkId, ArtworkSaveRequest req)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId is null) return Unauthorized();

        var artwork = await context.Artworks.FindAsync(artworkId);
        if (artwork is null || artwork.UserId != userId) return NotFound();

        var validationResult = validator.Validate(req);
        if (!validationResult.IsValid) return BadRequest(validationResult.Errors);

        artwork.Description = req.Description;

        try
        {
            await context.SaveChangesAsync();
        }
        catch
        {
            return StatusCode(500);
        }

        var updatedArtwork = GetArtworkWithUserAndCommentsResponse(artworkId, userId);
        return Ok(updatedArtwork);
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
