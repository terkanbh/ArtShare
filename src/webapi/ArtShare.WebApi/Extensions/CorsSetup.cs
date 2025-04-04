namespace ArtShare.WebApi.Extensions;

public static class CorsSetup
{
    public static IServiceCollection AddCors(this IServiceCollection services, IConfiguration configuration)
    {
        var allowedOrigins = configuration["AllowedOrigins"]!;
        
        services.AddCors(options => {
            options.AddDefaultPolicy(
                builder => builder.WithOrigins(allowedOrigins)
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
            );
        });

        return services;
    }
}