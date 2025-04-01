using ArtShare.WebApi.Requests;
using FluentValidation;

namespace ArtShare.WebApi.Validation;

public class UserRegisterValidator : AbstractValidator<UserRegisterRequest>
{
    public UserRegisterValidator()
    {
        RuleFor(x => x.FirstName).ApplyNameRules("FirstName");
        RuleFor(x => x.LastName).ApplyNameRules("LastName");
        RuleFor(x => x.Email).ApplyEmailRules();
        RuleFor(x => x.Password).ApplyPasswordRules();
    }
}
