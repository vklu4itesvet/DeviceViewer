import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { DeviceService } from '../device.service';
import { DeviceDetails } from '../_models/device-details.model';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html'
})
export class DeviceDetailsComponent implements OnInit {

  details = new DeviceDetails();
  
  constructor(private deviceService : DeviceService, private route: ActivatedRoute, private _location: Location) { }

  async ngOnInit() {
    const deviceId = this.route.snapshot.paramMap.get("id") as string;
    this.details = await this.deviceService.getDetails(deviceId);
  }

  onBackClick(){
    this._location.back();
  }

  format(flag : boolean): string{
      return flag ? 'Ja' : 'Nein';
  }
}