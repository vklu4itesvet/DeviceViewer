using System;

namespace DataModel
{
  public class Device
  {
    public Guid Id { get; set; }

    public string Name { get; set; }

    public string DeviceTypeId { get; set; }

    public bool Filsafe { get; set; }

    public int TempMin { get; set; }

    public int TempMax { get; set; }

    public Position InstallationPosition { get; set; }

    public bool InsertInto19InchCabinet { get; set; }

    public bool MotionEnable { get; set; }

    public bool SiplusCatalog { get; set; }

    public bool SimaticCatalog { get; set; }

    public int RotationAxisNumber { get; set; }

    public int PositionAxisNumber { get; set; }
  }
}
