using Microsoft.EntityFrameworkCore;
using Task_Management_Application_Backend.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<ApplicationDbContext>(Options =>
{
    Options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new System.Text.Json.Serialization.JsonStringEnumConverter()
        );
    });


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOriginsWithCredentials", builder =>
    {
        builder.SetIsOriginAllowed(_ => true)
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowAllOriginsWithCredentials");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
