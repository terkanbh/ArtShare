using FluentValidation;

namespace ArtShare.WebApi.Extensions;

public static class FluentValidationSetup
{
    public static void AddFluentValidation(this IServiceCollection services)
    {
        services.AddValidatorsFromAssemblyContaining<Program>();
    }
}