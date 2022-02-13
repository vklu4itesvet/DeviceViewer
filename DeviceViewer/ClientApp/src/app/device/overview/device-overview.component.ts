import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../device.service';
import { DeviceOverview } from '../_models/device-overview.model';

@Component({
  selector: 'app-device-overview',
  templateUrl: './device-overview.component.html',
  styleUrls: ['./device-overview.component.scss']
})
export class DeviceOverviewComponent implements OnInit {
  devices = new Array<DeviceOverview>();

  constructor(private deviceService: DeviceService) { }

  async ngOnInit() {
    this.deviceService.loadOverview().subscribe(data => this.devices = data);
  }

  async onDelete(device: DeviceOverview) {
    await this.deviceService.delete(device);
  }
}
