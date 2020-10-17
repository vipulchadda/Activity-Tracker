import { ActivityType } from '../enums/activity-type.enum';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrackResponse } from '../model/track-response.model';
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

    trackActivity(type: ActivityType): Observable<TrackResponse> {
        return this.httpClient.post<TrackResponse>(`${environment.baseURL}/track-activity`, { type: type });
    }
}
