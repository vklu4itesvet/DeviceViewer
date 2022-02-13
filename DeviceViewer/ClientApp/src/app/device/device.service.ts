import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DeviceOverview } from './_models/device-overview.model';
import { DeviceDetails } from './_models/device-details.model';

@Injectable()
export class DeviceService {
    private static readonly basePath = 'device';
    private devices : DeviceOverview[];

    constructor(private http : HttpClient){
        debugger;
    }

    upload(deviceRawDataStr : string): Promise<boolean> {
        const parsed = JSON.parse(deviceRawDataStr);
        const payload = JSON.stringify(parsed.devices);
        const options = { 'headers': new HttpHeaders()
        .set('content-type', 'application/json') };
        return this.http.put<boolean>(this.getUrl('upload'), payload, options).toPromise();
    }

    async getDetails(deviceId: string): Promise<DeviceDetails>{
        const options = { params : new HttpParams().append('id', deviceId) };
        const details = await this.http.get<DeviceDetails>(this.getUrl('details'), options).toPromise();
        return details;
    }

    async loadOverview(): Promise<DeviceOverview[]> {
        this.devices = await this.http.get<DeviceOverview[]>(this.getUrl('overview')).toPromise();
        return this.devices;
    }

    async delete(d : DeviceOverview){
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