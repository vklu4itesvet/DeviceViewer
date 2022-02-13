import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Device } from './device.model';

@Injectable()
export class DeviceService {
    private static readonly basePath = 'device';
    private devices : Device[];

    constructor(private http : HttpClient){
    }

    upload(deviceRawDataStr : string): Promise<boolean> {
        const parsed = JSON.parse(deviceRawDataStr);
        const payload = JSON.stringify(parsed.devices);
        const options = { 'headers': new HttpHeaders()
        .set('content-type', 'application/json') };
        return this.http.put<boolean>(this.getUrl('upload'), payload, options).toPromise();
    }

    async loadList(): Promise<Device[]> {
        this.devices = await this.http.get<Device[]>(this.getUrl('overview')).toPromise();
        return this.devices;
    }

    async delete(d : Device){
        const options = { params: new HttpParams().append('id', d.entityId) };
        const commited = await this.http.delete<boolean>(this.getUrl('delete'), options).toPromise<boolean>();

        if(commited){
            this.devices.splice(this.devices.indexOf(d), 1);
        }
    }

    private getUrl(subPath : string) : string {
      return `${environment.apiUrl}/${DeviceService.basePath}/${subPath}`;
   }
}