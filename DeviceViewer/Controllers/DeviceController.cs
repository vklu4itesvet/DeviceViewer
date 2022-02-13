using Data.Interfaces;
using DataModel;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace DeviceViewer.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class DeviceController : ControllerBase
  {
    private readonly IDeviceRepository _deviceRepository;
    private readonly ILogger<DeviceController> _logger;

    public DeviceController(IDeviceRepository deviceRepository, ILogger<DeviceController> logger)
    {
      _deviceRepository = deviceRepository;
      _logger = logger;
    }

    [HttpPut]
    [Route("upload")]
    public async Task<IActionResult> Upload([FromBody] IEnumerable<Device> devices)
    {
      await Task.Delay(2000);
      return Ok(true);
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