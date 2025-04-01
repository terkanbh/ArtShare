using ArtShare.WebApi.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ArtShare.WebApi.Data;

public class ArtShareDbContext : IdentityDbContext<User>
{
    public ArtShareDbContext(DbContextOptions<ArtShareDbContext> opt)
        : base(opt) { }

    public DbSet<Artwork> Artworks { get; set; }
    public DbSet<Like> Likes { get; set; }
    public DbSet<Comment> Comments { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Artwork>(artwork => {
            artwork.HasOne(a => a.User).WithMany(u => u.Artworks);
        });

        builder.Entity<Like>(like => {
            like.HasOne(l => l.Artwork).WithMany(a => a.Likes);
        });

        builder.Entity<Comment>(comment => {
            comment.HasOne(c => c.User).WithMany(u => u.Comments);
            comment.HasOne(c => c.Artwork).WithMany(a => a.Comments);
        });

        base.OnModelCreating(builder);
    }
}