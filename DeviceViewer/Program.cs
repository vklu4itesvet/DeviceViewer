using Data.Interfaces;
using Data.Repository.Mongo;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<ConnectionConfig>(builder.Configuration.GetSection(nameof(ConnectionConfig)));

builder.Services.AddControllersWithViews();
builder.Services.AddCors();
builder.Services.AddScoped<IDeviceRepository, DeviceRepository>();

var app = builder.Build();
  
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
  // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
  app.UseHsts();
}

app.UseCors(cors => cors.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();



app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
