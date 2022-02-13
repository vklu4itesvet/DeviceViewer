using Data.Interfaces;
using DataModel;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
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

    public Task<List<Device>> GetAllAsync() => Collection.AsQueryable().ToListAsync();

    public Task InsertAsync(IEnumerable<Device> entities) => Collection.InsertManyAsync(entities);

    public async Task<bool> DeleteAsync(Device entity)
    {
      var res = await Collection.DeleteOneAsync(x => x.Id == entity.Id);
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
