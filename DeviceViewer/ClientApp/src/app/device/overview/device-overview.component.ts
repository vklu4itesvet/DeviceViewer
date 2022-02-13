import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../device.service';
import { Device } from '../device.model';

@Component({
  selector: 'app-device-overview',
  templateUrl: './device-overview.component.html',
  styleUrls: ['./device-overview.component.css']
})
export class DeviceOverviewComponent implements OnInit {
  devices = new Array<Device>();

  constructor(private deviceService : DeviceService) { }

  async ngOnInit() {
      this.devices = await this.deviceService.getList();
  }
}