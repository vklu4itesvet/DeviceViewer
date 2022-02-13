using Data.Interfaces;
using DataModel;
using Microsoft.AspNetCore.Mvc;

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

    [HttpGet]
    [Route("[action]")]
    public async IAsyncEnumerable<DeviceOverviewModel> Overview()
    {
      await foreach(var device in _deviceRepository.GetAllAsync())
      {
        yield return new DeviceOverviewModel
        {
          EntityId = device.EntityId,
          Name = device.Name,
          Failsafe = device.Failsafe,
          DeviceTypeId = device.DeviceTypeId
        };
      }
    }

    [HttpGet]
    [Route("[action]")]
    public async Task<Device> Details(Guid id) => await _deviceRepository.GetByIdAsync(id);

    [HttpPut]
    [Route("[action]")]
    public async Task Upload([FromBody] IEnumerable<Device> devices) => await _deviceRepository.InsertAsync(devices);

    [HttpDelete]
    [Route("[action]")]
    public async Task<bool> Delete(Guid id) => await _deviceRepository.DeleteAsync(id);
  
    public class DeviceOverviewModel
    {
      public Guid EntityId { get; set; }

      public string Name { get; set; }

      public string DeviceTypeId { get; set; }

      public bool Failsafe { get; set; }
    }
  }
}