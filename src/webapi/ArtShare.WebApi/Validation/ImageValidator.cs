using FluentValidation;

namespace ArtShare.WebApi.Validation;

public class ImageValidator : AbstractValidator<IFormFile>
{
    public ImageValidator()
    {
        RuleFor(x => x)
            .NotNull().WithMessage("Image must not be null.")
            .NotEmpty().WithMessage("Image file must not be empty.")
            .Must(file => file.Length <= 40 * 1024)
            .WithMessage("Image size must be less than 40KB.")
            .Must(file => Path.GetExtension(file.FileName).ToLower() == ".webp")
            .WithMessage("Image must be in .webp format.");
    }
}
