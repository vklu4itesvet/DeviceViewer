using DataModel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Data.Interfaces
{
  public interface IDeviceRepository
  {
    Task<List<Device>> GetAllAsync();

    Task InsertAsync(IEnumerable<Device> entities);

    Task<bool> DeleteAsync(Device entity);
  }
}
