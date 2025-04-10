using FluentValidation;

namespace ArtShare.WebApi.Validation;

public static class UserRequestValidationRules
{
    public static IRuleBuilderOptions<T, string> ApplyNameRules<T>(this IRuleBuilder<T, string> ruleBuilder, string fieldName)
    {
        return ruleBuilder
            .NotEmpty().WithMessage($"{fieldName} is required.")
            .MaximumLength(50).WithMessage($"{fieldName} must be less than 50 characters.")
            .Matches("^[A-Za-z]+(?: [A-Za-z]+)*$").WithMessage($"{fieldName} must contain only letters.");
    }

    public static IRuleBuilderOptions<T, string> ApplyEmailRules<T>(this IRuleBuilder<T, string> ruleBuilder)
    {
        return ruleBuilder
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Invalid email format.");
    }

    public static IRuleBuilderOptions<T, string> ApplyPasswordRules<T>(this IRuleBuilder<T, string> ruleBuilder)
    {
        return ruleBuilder
            .NotEmpty().WithMessage("Password is required.")
            .MinimumLength(6).WithMessage("Password must be at least 6 characters long.")
            .Matches("[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
            .Matches("[a-z]").WithMessage("Password must contain at least one lowercase letter.")
            .Matches("[0-9]").WithMessage("Password must contain at least one digit.");
    }
}
