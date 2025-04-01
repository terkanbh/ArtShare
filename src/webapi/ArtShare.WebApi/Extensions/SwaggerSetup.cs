namespace ArtShare.WebApi.Extensions;

public static class SwaggerSetup
{
    public static void UseSwaggerInDevelopment(this IApplicationBuilder app)
    {
        if (app.ApplicationServices.GetRequiredService<IWebHostEnvironment>().IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
    }

    public static void AddSwagger(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
    }
}