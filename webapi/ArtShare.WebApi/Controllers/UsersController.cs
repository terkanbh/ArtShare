using System.Security.Claims;
using ArtShare.WebApi.Data;
using ArtShare.WebApi.Data.Models;
using ArtShare.WebApi.Requests;
using ArtShare.WebApi.Utilities;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArtShare.WebApi.Controllers;

[ApiController]
public class UsersController(ArtShareDbContext context, IValidator<UserUpdateRequest> validator, SignInManager<User> signInManager, UserManager<User> userManager) : Controller
{
    [HttpGet("/api/users")]
    public IActionResult GetUsers()
    {
        var users = userManager.Users.Select(u => ResponseMapper.Map(u));
        return Ok(users);
    }

    [HttpGet]
    [Route("/api/users/{id}")]
    public async Task<IActionResult> GetUser(string id)
    {
        var user = await userManager.FindByIdAsync(id);

        if (user is null) return NotFound($"No user with id {id} found.");

        return Ok(ResponseMapper.Map(user));
    }

    [HttpGet]
    [Route("/api/users/{id}/artworks")]
    public IActionResult GetUserWithArtworks(string id)
    {
        var user = context.Users
            .Where(u => u.Id == id)
            .Include(u => u.Artworks)
                .ThenInclude(a => a.Likes)
            .Include(u => u.Artworks)
                .ThenInclude(a => a.Comments)
            .Select(u => new
            {
                User = ResponseMapper.Map(u),
                Artworks = u.Artworks.Select(a => ResponseMapper.Map(a))
            })
            .FirstOrDefault();

        if (user is null) return NotFound();

        return Ok(user);
    }

    [HttpPut]
    [Authorize]
    [Route("/api/users/{id}")]
    public async Task<IActionResult> Update(string id, UserUpdateRequest req)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userId is null || userId != id) return Forbid();

        var validationResult = await validator.ValidateAsync(req);
        if (!validationResult.IsValid)
        {
            var errorMessages = validationResult.Errors.Select(e => e.ErrorMessage).ToArray();
            return BadRequest(ResponseMapper.MapError("Validation failed.", errorMessages));
        }

        if (context.Users.Any(u => u.Id != id && u.Email == req.Email))
            return BadRequest(new { Errors = new[] {"Email already in use"}});

        var user = await userManager.FindByIdAsync(userId);
        if (user is null) return StatusCode(500);

        user.Email = req.Email;
        user.FirstName = req.FirstName;
        user.LastName = req.LastName;

        var result = await userManager.UpdateAsync(user);
        if (!result.Succeeded) return StatusCode(500);

        return Ok(ResponseMapper.Map(user));
    }

    [HttpDelete]
    [Authorize]
    [Route("/api/users/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userId is null || userId != id) return Forbid();

        var user = await userManager.FindByIdAsync(userId);

        if (user is null) return StatusCode(500);

        var result = await userManager.DeleteAsync(user);
        if (!result.Succeeded) return StatusCode(500);

        await signInManager.SignOutAsync();

        return NoContent();
    }
}