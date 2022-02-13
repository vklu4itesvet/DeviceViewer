import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DeviceService } from './device.service';
import { DeviceUploadComponent } from './upload/device-upload.component';
import { DeviceOverviewComponent } from './overview/device-overview.component';


@NgModule({
  declarations: [
    DeviceUploadComponent,
    DeviceOverviewComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule 
  ],
  exports : [
    DeviceUploadComponent,
    DeviceOverviewComponent
  ],
  providers: [
    DeviceService
  ]
})
export class DeviceModule { }
