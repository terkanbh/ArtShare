using ArtShare.WebApi.Extensions;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

builder.Services.AddControllers();
builder.Services.AddAuthorization();
builder.Services.AddSwagger();
builder.Services.AddDatabase(config);
builder.Services.AddIdentity();
builder.Services.AddFluentValidation();

var app = builder.Build();

app.UseSwaggerInDevelopment();
app.SeedDatabase();
app.UseAuthorization();
app.MapControllers();

app.Run();