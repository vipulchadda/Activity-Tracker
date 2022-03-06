import { ActivityType } from '../enums/activity-type.enum';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, scheduled } from 'rxjs';
import { TrackRequest, TrackResponse } from '../model/track-activity.model';
import { Activity } from '../model/activity.model';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private httpClient: HttpClient, private dataService: DataService) {}

    getSummary(date: Date): Observable<Activity> {
        if (environment.useLocal) {
            return of(this.dataService.getDaySummary(date));
        } else {
            const params = {
                date: date.toUTCString(),
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            };
            return this.httpClient.get<Activity>(`${environment.baseURL}/get-day-summary`, { params: params });
        }
    }

    trackActivity(type: ActivityType, manual: boolean, manualTime: string): Observable<TrackResponse> {
        const time = manual ? new Date(manualTime) : new Date();
        if (environment.useLocal) {
            this.dataService.trackActivity(type, time);
            return of({ message: `Activity logged for type ${type}` });
        } else {
            const body: TrackRequest = {
                type: type,
                datetime: time,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            };
            return this.httpClient.post<TrackResponse>(`${environment.baseURL}/track-activity`, body);
        }
    }
}
