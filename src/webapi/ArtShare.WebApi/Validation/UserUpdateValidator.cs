using ArtShare.WebApi.Requests;
using FluentValidation;

namespace ArtShare.WebApi.Validation;

public class UserUpdateValidator : AbstractValidator<UserUpdateRequest>
{
    public UserUpdateValidator()
    {
        RuleFor(x => x.FirstName).ApplyNameRules("FirstName");
        RuleFor(x => x.LastName).ApplyNameRules("LastName");
        RuleFor(x => x.Email).ApplyEmailRules();
    }
}
