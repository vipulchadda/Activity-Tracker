import { ActivityType } from '../enums/activity-type.enum';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrackRequest, TrackResponse } from '../model/track-activity.model';
import { Activity } from '../model/activity.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private httpClient: HttpClient) {}

    getSummary(date: Date): Observable<Activity> {
        const params = {
            date: date.toLocaleDateString('en-US'),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        return this.httpClient.get<Activity>(`${environment.baseURL}/get-day-summary`, { params: params });
    }

    trackActivity(type: ActivityType, manual: boolean, manualTime: string): Observable<TrackResponse> {
        const body: TrackRequest = {
            type: type,
            datetime: new Date(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        if (manual) {
            body.datetime = new Date(manualTime);
        }
        return this.httpClient.post<TrackResponse>(`${environment.baseURL}/track-activity`, body);
    }
}
