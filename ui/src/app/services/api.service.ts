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
            format: '%m/%d/%Y'
        };
        return this.httpClient.get<Activity>(`${environment.baseURL}/get-day-summary`, { params: params });
    }

    trackActivity(type: ActivityType, manual: boolean, manualTime: string): Observable<TrackResponse> {
        const body: TrackRequest = {
            type: type
        };
        if (manual) {
            body.datetime = new Date(manualTime).toUTCString();
            body.format = '%a, %d %b %Y %H:%M:%S %Z';
        }
        return this.httpClient.post<TrackResponse>(`${environment.baseURL}/track-activity`, body);
    }
}
