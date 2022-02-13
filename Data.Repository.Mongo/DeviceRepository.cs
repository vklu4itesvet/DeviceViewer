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

    public async IAsyncEnumerable<Device> GetAllAsync()
    {
      var filter = Builders<Device>.Filter.Empty;
      var projection = Builders<Device>.Projection.Include(p => p.EntityId).Include(p => p.Name);
      var options = new FindOptions<Device, Device> { Projection = projection };

      using (var cursor = await Collection.FindAsync(filter, options))
      {
        while (await cursor.MoveNextAsync())
        {
          foreach (var device in cursor.Current)
            yield return device;
        }
      }
    }

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
