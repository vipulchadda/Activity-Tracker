import { ActivityType } from '../enums/activity-type.enum';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrackResponse } from '../model/track-response.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private httpClient: HttpClient) {}

    trackActivity(type: ActivityType): Observable<TrackResponse> {
        return this.httpClient.post<TrackResponse>(`${environment.baseURL}/track-activity`, { type: type });
    }
}
