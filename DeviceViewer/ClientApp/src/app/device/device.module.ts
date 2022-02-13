import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DeviceService } from './device.service';
import { DeviceUploadComponent } from './upload/device-upload.component';
import { DeviceOverviewComponent } from './overview/device-overview.component';
import { DeviceDetailsComponent } from './details/device-details.component';


@NgModule({
  declarations: [
    DeviceUploadComponent,
    DeviceOverviewComponent,
    DeviceDetailsComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    DeviceUploadComponent,
    DeviceOverviewComponent,
    DeviceDetailsComponent
  ],
  providers: [
    DeviceService
  ]
})
export class DeviceModule { }
