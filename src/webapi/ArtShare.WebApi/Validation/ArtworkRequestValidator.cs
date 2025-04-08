using ArtShare.WebApi.Requests;
using FluentValidation;

namespace ArtShare.WebApi.Validation;

public class ArtworkRequestValidator : AbstractValidator<ArtworkCreateRequest>
{
    public ArtworkRequestValidator()
    {
        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("Description is required.")
            .MaximumLength(500).WithMessage("Description cannot exceed 500 characters.");

        RuleFor(x => x.Image)
            .NotNull().WithMessage("Image is required.")
            .Must(file => file.Length <= 40 * 1024).WithMessage("Image size must be less than 40KB.")
            .Must(file => Path.GetExtension(file.FileName).ToLower() == ".webp")
            .WithMessage("Image must be in .webp format.");
    }
}
