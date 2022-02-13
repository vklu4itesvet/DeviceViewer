using DataModel;
using Microsoft.AspNetCore.Mvc;

namespace DeviceViewer.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class DeviceController : ControllerBase
  {
    private readonly ILogger<DeviceController> _logger;

    public DeviceController(ILogger<DeviceController> logger)
    {
      _logger = logger;
    }

    [HttpGet]
    public IEnumerable<Device> Get()
    {
      return Enumerable.Range(1, 5).Select(index => new Device
      {
       
      })
      .ToArray();
    }
  }
}