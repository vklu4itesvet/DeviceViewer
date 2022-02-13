import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-device-upload',
  templateUrl: './device-upload.component.html'
})
export class DeviceUploadComponent {
  @Input() fileTypes = '';
  fileRawStr = '';
  busy = false;
  error = false;

  constructor(private deviceService: DeviceService) { }

  onFileChange(event: any): void {
    this.error = false;

    const reader = new FileReader();
    reader.onload = _ => {
      this.busy = true;
      this.fileRawStr = reader.result as string;
      this.busy = false;
    };
    reader.readAsText(event.target.files[0]);
  }

  async onFileUpload() {
    this.busy = true;

    try {
      await this.deviceService.upload(this.fileRawStr);
      this.fileRawStr = '';
    }
    catch {
      this.error = true;
    }

    this.busy = false;
  };
}
