using ArtShare.WebApi.Extensions;

var builder = WebApplication.CreateBuilder(args);
var settings = builder.Configuration;

builder.Services.AddControllers();
builder.Services.AddCors(settings);
builder.Services.AddAuthorization();
builder.Services.AddSwagger();
builder.Services.AddDatabase(settings);
builder.Services.AddIdentity();
builder.Services.AddFluentValidation();

var app = builder.Build();

app.UseSwaggerInDevelopment();
app.SeedDatabase();
app.UseCors();
app.UseAuthorization();
app.MapControllers();

app.Run();
