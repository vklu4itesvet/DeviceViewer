namespace Data.Interfaces
{
  public class ConnectionConfig
  {
    public string Server { get; set; }

    public string DataBase { get; set; }

    public void Deconstruct(out string server, out string db)
    {
      server = Server;
      db = DataBase;
    }
  }
}
