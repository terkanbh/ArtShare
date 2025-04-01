using System.Text.Json;
using ArtShare.WebApi.Data.Models;
using Microsoft.AspNetCore.Identity;

namespace ArtShare.WebApi.Data;

public class ArtShareDbSeeder(ArtShareDbContext context, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
{
    private readonly ArtShareDbContext _context = context;
    private readonly UserManager<User> _userManager = userManager;
    private readonly RoleManager<IdentityRole> _roleManager = roleManager;

    public void InitializeAndSeed()
    {
        if (_context.Database.EnsureCreated())
        {
            SeedDatabase();
        }
    }

    private void SeedDatabase()
    {
        SeedDatabaseAsync().GetAwaiter().GetResult();
    }

    private async Task SeedDatabaseAsync()
    {
        // Read data from JSON files
        var users = LoadJsonData<List<User>>("users.json");
        var artworks = LoadJsonData<List<Artwork>>("artworks.json");
        var comments = LoadJsonData<List<Comment>>("comments.json");
        var likes = LoadJsonData<List<Like>>("likes.json");

        // Add Roles
        await _roleManager.CreateAsync(new IdentityRole("Admin"));
        await _roleManager.CreateAsync(new IdentityRole("User"));

        // Add Users (Artists)
        foreach (var u in users)
        {
            u.UserName = u.Email;

            if (u.Email == "admin@admin.com")
            {
                await _userManager.CreateAsync(u, "Admin_123");
                await _userManager.AddToRoleAsync(u, "Admin");
            }
            else
            {
                await _userManager.CreateAsync(u, "User_123");
                await _userManager.AddToRoleAsync(u, "User");
            }
        }

        // Add Artworks
        _context.Artworks.AddRange(artworks);
        await _context.SaveChangesAsync();

        // Add Comments
        _context.Comments.AddRange(comments);
        await _context.SaveChangesAsync();

        // Add Likes
        _context.Likes.AddRange(likes);
        await _context.SaveChangesAsync();
    }

    private static T LoadJsonData<T>(string fileName)
    {
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "Resources", fileName);
        var json = File.ReadAllText(filePath);
        return JsonSerializer.Deserialize<T>(json)!;
    }
}