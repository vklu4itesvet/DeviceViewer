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
    public async Task<IEnumerable<Device>> Overview() => await _deviceRepository.GetAllAsync();

    [HttpGet]
    [Route("[action]")]
    public async Task<Device> Details(Guid id) => await _deviceRepository.GetByIdAsync(id);

    [HttpPut]
    [Route("[action]")]
    public async Task Upload([FromBody] IEnumerable<Device> devices) => await _deviceRepository.InsertAsync(devices);

    [HttpDelete]
    [Route("[action]")]
    public async Task<bool> Delete(Guid id) => await _deviceRepository.DeleteAsync(id);
  }
}