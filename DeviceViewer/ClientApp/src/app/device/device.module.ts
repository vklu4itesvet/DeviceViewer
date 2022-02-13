import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { DeviceUploadComponent } from './upload/device-upload.component';


@NgModule({
  declarations: [
    DeviceUploadComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
  ],
  exports : [
    DeviceUploadComponent
  ],
  providers: []
})
export class DeviceModule { }
