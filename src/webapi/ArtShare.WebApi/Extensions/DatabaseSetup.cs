using ArtShare.WebApi.Data;
using Microsoft.EntityFrameworkCore;

namespace ArtShare.WebApi.Extensions;

public static class DatabaseSetup
{
    public static void SeedDatabase(this IApplicationBuilder app)
    {
        using var scope = app.ApplicationServices.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<ArtShareDbSeeder>();
        db.InitializeAndSeed();
    }

    public static void AddDatabase(this IServiceCollection services, IConfiguration config)
    {
        services.AddDbContext<ArtShareDbContext>(opt => opt.UseSqlite(config.GetConnectionString("Default")));
        services.AddScoped<ArtShareDbSeeder>();
    }
}
