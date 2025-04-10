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
        {
            return Unauthorized();
        }

        var user = await userManager.GetUserAsync(User);
        
        if (user is null)
        {
            return Unauthorized();
        }

        return Ok(ResponseMapper.Map(user));
    }

    [HttpPost]
    [Route("/api/auth/login")]
    public async Task<IActionResult> Login(UserLoginRequest req)
    {
        // Check if the user is already authenticated
        if (User.Identity?.IsAuthenticated == true)
        {
            return BadRequest(ResponseMapper.MapError("Already logged in.", []));
        }

        // Attempt to sign in the user with the provided credentials
        var result = await signInManager.PasswordSignInAsync(req.Email, req.Password, req.RememberMe, false);

        if (!result.Succeeded)
        {
            return BadRequest(ResponseMapper.MapError("Login failed.", []));
        }

        // Retrieve the user from the database after successful authentication
        var user = await userManager.FindByEmailAsync(req.Email);

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
        // Validate the registration request
        var validationResult = validator.Validate(req);

        if (!validationResult.IsValid)
        {
            var errorMessages = validationResult.Errors.Select(e => e.ErrorMessage).ToArray();
            return BadRequest(ResponseMapper.MapError("Validation failed.", errorMessages));
        }

        // Create a new user instance
        var newUser = new User
        {
            FirstName = req.FirstName,
            LastName = req.LastName,
            Email = req.Email,
            UserName = req.Email
        };

        // Attempt to create the user in the database
        var result = await userManager.CreateAsync(newUser, req.Password);

        if (!result.Succeeded)
        {
            return BadRequest(result.Errors.Select(e => e.Description));
        }

        // Assign the default role "User" to the newly created account
        await userManager.AddToRoleAsync(newUser, "User");

        return Created($"/users/{newUser.Id}", ResponseMapper.Map(newUser));
    }
}
