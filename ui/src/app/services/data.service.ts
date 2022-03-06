import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivityType } from '../enums/activity-type.enum';
import { Activity } from '../model/activity.model';

const LOCAL_STORAGE_KEY = 'trackerData';
@Injectable({
    providedIn: 'root'
})
export class DataService {
    private data: { [date: string]: Activity };
    constructor() {
        this.data = localStorage.getItem(LOCAL_STORAGE_KEY) ? JSON.parse(localStorage.getItem('trackerData')) : {};
    }

    getDaySummary(date: Date): Activity {
        return this.data[this.getDateKey(date)];
    }

    trackActivity(type: ActivityType, date: Date) {
        const key = this.getDateKey(date);
        if (!this.data[key]) {
            this.data[key] = {
                PEE: [],
                POOP: [],
                WALK: [],
                FOOD: []
            };
        }
        this.data[key][type].push(date);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.data));
    }

    private getDateKey(date: Date) {
        return formatDate(date, 'yyyyMMdd', 'en-US');
    }
}
