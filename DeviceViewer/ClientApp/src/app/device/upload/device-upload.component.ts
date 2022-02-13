import { Component, Input } from '@angular/core';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-device-upload',
  templateUrl: './device-upload.component.html'
})
export class DeviceUploadComponent {
  @Input() fileTypes = '';
  fileRawStr = '';
  busy = false;

  constructor(private deviceService: DeviceService) { }

  onFileChange(event: any): void {
    const reader = new FileReader();
    reader.onload = async _ => {
      this.busy = true;
      this.fileRawStr = reader.result as string;
      await this.deviceService.upload(this.fileRawStr);
      this.busy = false;
    };
    reader.readAsText(event.target.files[0]);
  }

  onFileUpload(): void {
    this.busy = true;
    this.busy = false;
  };
}
