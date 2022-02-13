import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { DeviceOverview } from './_models/device-overview.model';
import { DeviceDetails } from './_models/device-details.model';

@Injectable()
export class DeviceService {
  private static readonly basePath = 'device';
  private readonly devices$ = new BehaviorSubject<DeviceOverview[]>(new Array<DeviceOverview>());

  constructor(private http: HttpClient) {
  }

  async upload(deviceRawDataStr: string): Promise<void> {
    const parsed = JSON.parse(deviceRawDataStr);
    const payload = JSON.stringify(parsed.devices);
    const options = {
      'headers': new HttpHeaders()
        .set('content-type', 'application/json')
    };

    await this.http.put<void>(this.getUrl('upload'), payload, options).toPromise();
    this.loadOverview();
  }

  async getDetails(deviceId: string): Promise<DeviceDetails> {
    const options = { params: new HttpParams().append('id', deviceId) };
    const details = await this.http.get<DeviceDetails>(this.getUrl('details'), options).toPromise();
    return details;
  }

  loadOverview(): Observable<DeviceOverview[]> {
    this.http.get<DeviceOverview[]>(this.getUrl('overview')).subscribe(data => this.devices$.next(data));
    return this.devices$.asObservable();
  }

  async delete(d: DeviceOverview) {
    const options = { params: new HttpParams().append('id', d.entityId) };
    const commited = await this.http.delete<boolean>(this.getUrl('delete'), options).toPromise<boolean>();

    if (commited) {
      this.devices$.value.splice(this.devices$.value.indexOf(d), 1);
    }
  }

  private getUrl(subPath: string): string {
    return `${environment.apiUrl}/${DeviceService.basePath}/${subPath}`;
  }
}
