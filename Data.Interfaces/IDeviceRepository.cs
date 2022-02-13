using DataModel;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Data.Interfaces
{
  public interface IDeviceRepository
  {
    Task<Device> GetByIdAsync(Guid id);

    IAsyncEnumerable<Device> GetAllAsync();

    Task InsertAsync(IEnumerable<Device> devices);

    Task<bool> DeleteAsync(Guid id);
  }
}
