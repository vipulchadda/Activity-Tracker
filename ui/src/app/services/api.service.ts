import { Injectable } from '@angular/core';
import { ActivityType } from '../enums/activity-type.enum';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseURL = 'https://northamerica-northeast1-weighty-card-288817.cloudfunctions.net';

  constructor(private httpClient: HttpClient) {}

  trackActivity(type: ActivityType) {
    this.httpClient
      .post(`${this.baseURL}/test-function`, { type: type })
      // .post(`${this.baseURL}/api/track`, { type: type })
      .subscribe((resp) => console.log(resp));
  }
}