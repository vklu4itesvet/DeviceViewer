import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable()
export class DeviceService {
    private static readonly basePath = 'device';

    constructor(private http : HttpClient){
    }

    upload(deviceRawDataStr : string): Promise<boolean> {
        const parsed = JSON.parse(deviceRawDataStr);
        const payload = JSON.stringify(parsed.devices);
        const options = { 'headers': new HttpHeaders()
        .set('content-type', 'application/json') };
        return this.http.put<boolean>(this.getUrl('upload'), payload, options).toPromise();
    }

    private getUrl(subPath : string) : string {
      return `${environment.apiUrl}/${DeviceService.basePath}/${subPath}`;
   }
}