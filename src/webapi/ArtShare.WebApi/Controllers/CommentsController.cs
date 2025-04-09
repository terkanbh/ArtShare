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
public class CommentsController(
    ArtShareDbContext context,
    IValidator<CommentSaveRequest> validator) : Controller
{
    [HttpGet]
    [Route("/api/comments")]
    public async Task<IActionResult> GetAll()
    {
        var comments = await context.Comments
            .Include(c => c.User)
            .Include(c => c.Artwork)
            .ToListAsync();

        return Ok(comments.Select(ResponseMapper.Map));
    }

    [HttpGet]
    [Route("/api/comments/{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        var comment = await context.Comments
            .Include(c => c.User)
            .Include(c => c.Artwork)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (comment is null)
        {
            return NotFound();
        }

        return Ok(ResponseMapper.Map(comment));
    }

    [HttpPost]
    [Authorize]
    [Route("/api/comments/{artworkId}")]
    public async Task<IActionResult> Create(string artworkId, CommentSaveRequest req)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId is null)
        {
            return Unauthorized();
        }

        if (!await context.Artworks.AnyAsync(a => a.Id == artworkId))
        {
            return BadRequest("Artwork not found");
        }

        var validationResult = validator.Validate(req);
        if (!validationResult.IsValid) return BadRequest(validationResult.Errors);

        var newComment = new Comment
        {
            Id = Guid.NewGuid().ToString(),
            ArtworkId = artworkId,
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

    [HttpPut]
    [Authorize]
    [Route("/api/comments/{id}")]
    public async Task<IActionResult> Update(string id, CommentSaveRequest req)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var validationResult = validator.Validate(req);

        var comment = await context.Comments.FirstOrDefaultAsync(c => c.Id == id);

        if (comment is null) return NotFound();
        if (comment.UserId != userId) return Forbid();

        if (!validationResult.IsValid) return BadRequest(validationResult.Errors);
        if (userId is null) return Unauthorized();

        comment.Text = req.Text;
        
        try
        {
            await context.SaveChangesAsync();
        }
        catch
        {
            return StatusCode(500);
        }

        return Ok(ResponseMapper.Map(comment));
    }

    [HttpDelete]
    [Authorize]
    [Route("/api/comments/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId is null) return Unauthorized();

        var comment = await context.Comments.FirstOrDefaultAsync(c => c.Id == id);

        if (comment is null) return NotFound();
        if (comment.UserId != userId) return Forbid();

        context.Comments.Remove(comment);

        try
        {
            await context.SaveChangesAsync();
        }
        catch
        {
            return StatusCode(500);
        }

        return NoContent();
    }
}
