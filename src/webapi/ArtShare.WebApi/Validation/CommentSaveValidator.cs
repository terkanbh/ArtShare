using ArtShare.WebApi.Requests;
using FluentValidation;

namespace ArtShare.WebApi.Validation;

public class CommentSaveValidator : AbstractValidator<CommentSaveRequest>
{
    public CommentSaveValidator()
    {
        RuleFor(x => x.Text)
            .NotEmpty().WithMessage("Comment cannot be null or empty.")
            .MaximumLength(500).WithMessage("Comment cannot exceed 500 characters.");
    }
}
