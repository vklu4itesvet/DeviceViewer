using Data.Interfaces;
using DataModel;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Data.Repository.Mongo
{
  public class DeviceRepository : IDeviceRepository
  {
    public DeviceRepository(IOptions<ConnectionConfig> config)
    {
      if (config.Value == null)
        throw new ArgumentNullException("config");

      (string server, string db) = config.Value;

      GetDatabase(server, db);
      GetCollection();
    }

    protected IMongoDatabase Database;
    protected IMongoCollection<Device> Collection;

    public Task<Device> GetByIdAsync(Guid id) => Collection.FindAsync(d => d.EntityId == id).Result.SingleAsync();

    public async Task<IEnumerable<Device>> GetAllAsync() => await Collection.AsQueryable().ToListAsync();

    public Task InsertAsync(IEnumerable<Device> devices)
    {
      return Collection.InsertManyAsync(devices);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
      var res = await Collection.DeleteOneAsync(x => x.EntityId == id);
      return res.IsAcknowledged;
    }

    private void GetDatabase(string server, string dbName)
    {
      var clientSettings = MongoClientSettings.FromConnectionString(server);
      var client = new MongoClient(clientSettings);
      Database = client.GetDatabase(dbName);
    }

    private void GetCollection() => Collection = Database.GetCollection<Device>("devices");
  }
}
