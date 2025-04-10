using ArtShare.WebApi.Data.Models;
using ArtShare.WebApi.Requests;
using ArtShare.WebApi.Utilities;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ArtShare.WebApi.Controllers;

[ApiController]
public class AuthController(UserManager<User> userManager, SignInManager<User> signInManager, IValidator<UserRegisterRequest> validator) : Controller
{
    [HttpGet()]
    [Route("api/auth/me")]
    public async Task<IActionResult> GetCurrentUser()
    {
        if (User.Identity is null || !User.Identity.IsAuthenticated)
            return Unauthorized();

        var user = await userManager.GetUserAsync(User);
        if (user is null) return Unauthorized();

        return Ok(ResponseMapper.Map(user));
    }

    [HttpPost]
    [Route("/api/auth/login")]
    public async Task<IActionResult> Login(UserLoginRequest req)
    {
        if (User.Identity?.IsAuthenticated == true)
            return BadRequest(new {Errors = new[] {"Already logged in"}});

        var result = await signInManager.PasswordSignInAsync(req.Email, req.Password, req.RememberMe, false);

        if (!result.Succeeded)
            return BadRequest(new {Errors = new[] {"Login failed"}});

        var user = await userManager.FindByEmailAsync(req.Email);

        if (user is null) return StatusCode(500);

        return Ok(ResponseMapper.Map(user!));
    }

    [HttpPost]
    [Authorize]
    [Route("/api/auth/logout")]
    public async Task<IActionResult> Logout()
    {
        await signInManager.SignOutAsync();
        return NoContent();
    }

    [HttpPost]
    [Route("/api/auth/register")]
    public async Task<IActionResult> Register(UserRegisterRequest req)
    {
        var validationResult = validator.Validate(req);
        if (!validationResult.IsValid)
        {
            var errorMessages = validationResult.Errors.Select(e => e.ErrorMessage).ToArray();
            return BadRequest(new { Errors = errorMessages});
        }

        var existingUser = await userManager.FindByEmailAsync(req.Email);
        if (existingUser is not null)
            return BadRequest(new { Errors = new[] {"Email already in use"}});

        var newUser = new User
        {
            FirstName = req.FirstName,
            LastName = req.LastName,
            Email = req.Email,
            UserName = req.Email
        };

        var result = await userManager.CreateAsync(newUser, req.Password);

        if (!result.Succeeded) return StatusCode(500);

        await userManager.AddToRoleAsync(newUser, "User");

        return Created($"/users/{newUser.Id}", ResponseMapper.Map(newUser));
    }
}
