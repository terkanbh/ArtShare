using ArtShare.WebApi.Data;
using ArtShare.WebApi.Data.Models;
using Microsoft.AspNetCore.Identity;

namespace ArtShare.WebApi.Extensions;

public static class IdentitySetup
{
    public static void AddIdentity(this IServiceCollection services)
    {
        var identityBuilder = services.AddIdentity<User, IdentityRole>();
        identityBuilder.AddEntityFrameworkStores<ArtShareDbContext>();
        identityBuilder.AddDefaultTokenProviders();

        services.Configure<IdentityOptions>(options =>
        {
            options.Password.RequireDigit = true;
            options.Password.RequireLowercase = true;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = true;
            options.Password.RequiredLength = 6;
            options.Password.RequiredUniqueChars = 1;
        });
    }
}