import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../device.service';
import { Device } from '../device.model';

@Component({
  selector: 'app-device-overview',
  templateUrl: './device-overview.component.html',
  styleUrls: ['./device-overview.component.scss']
})
export class DeviceOverviewComponent implements OnInit {
  devices = new Array<Device>();

  constructor(private deviceService : DeviceService) { }

  async ngOnInit() {
      this.devices = await this.deviceService.loadList();
  }

  async onDelete(device : Device){
    this.deviceService.delete(device);
  }
}