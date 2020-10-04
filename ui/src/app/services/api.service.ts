import { Injectable } from '@angular/core';
import { ActivityType } from '../enums/activity-type.enum';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private httpClient: HttpClient) {}

    trackActivity(type: ActivityType) {
        this.httpClient
            .post(`${environment.baseURL}/track-activity`, { type: type })
            .subscribe((resp) => console.log(resp));
    }
}
