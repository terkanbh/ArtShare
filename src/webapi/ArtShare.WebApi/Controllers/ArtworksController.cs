using ArtShare.WebApi.Data;
using ArtShare.WebApi.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArtShare.WebApi.Controllers;

[ApiController]
public class ArtworksController(ArtShareDbContext context) : Controller
{
    [HttpGet]
    [Route("/api/artworks")]
    public IActionResult GetArtworksWithUser()
    {
        var artworks = context.Artworks
            .Include(a => a.User)
            .Include(a => a.Likes)
            .Include(a => a.Comments)
            .Select(a => new
            {
                Artwork = ResponseMapper.Map(a),
                User = ResponseMapper.Map(a.User!)
            });

        return Ok(artworks);
    }

    [HttpGet]
    [Route("/api/artworks/{id}")]
    public IActionResult GetArtworkWithUserAndComments(string id)
    {
        var artwork = context.Artworks
            .Where(a => a.Id == id)
            .Include(a => a.User)
            .Include(a => a.Likes)
            .Include(a => a.Comments)
            .ThenInclude(c => c.User)
            .Select(a => new
            {
                Artwork = ResponseMapper.Map(a),
                User = ResponseMapper.Map(a.User!),
                Comments = ResponseMapper.Map(a.Comments)
            })
            .FirstOrDefault();

        if (artwork is null)
        {
            return NotFound();
        }

        return Ok(artwork);
    }
}