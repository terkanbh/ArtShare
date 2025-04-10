using ArtShare.WebApi.Requests;
using FluentValidation;

namespace ArtShare.WebApi.Validation;

public class ArtworkSaveValidator : AbstractValidator<ArtworkSaveRequest>
{
    public ArtworkSaveValidator()
    {
        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("Description is required.")
            .MaximumLength(500).WithMessage("Description cannot exceed 500 characters.");
    }
}
