using System.Security.Claims;
using ArtShare.WebApi.Data;
using ArtShare.WebApi.Data.Models;
using ArtShare.WebApi.Requests;
using ArtShare.WebApi.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArtShare.WebApi.Controllers;

[ApiController]
public class CommentsController(ArtShareDbContext context) : Controller
{
    [HttpPost]
    [Authorize]
    [Route("/api/comments")]
    public async Task<IActionResult> Create(CommentCreateRequest req)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId is null)
        {
            return Unauthorized();
        }

        if (!await context.Artworks.AnyAsync(a => a.Id == req.ArtworkId))
        {
            return BadRequest("Artwork not found");
        }

        var newComment = new Comment
        {
            Id = Guid.NewGuid().ToString(),
            ArtworkId = req.ArtworkId,
            UserId = userId,
            Text = req.Text,
            CreatedAt = DateTime.UtcNow
        };

        context.Add(newComment);

        try
        {
            await context.SaveChangesAsync();
        }
        catch
        {
            return StatusCode(500);
        }

        var created = context.Comments
            .Include(c => c.User)
            .FirstOrDefault(c => c.Id == newComment.Id);

        return Ok(created is null ? null : ResponseMapper.Map(created));
    }
}