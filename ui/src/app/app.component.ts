import { ActivityType } from './enums/activity-type.enum';
import { Component, ViewChild } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @ViewChild(MatInput) manualTime: MatInput;

    activityType = ActivityType;
    manual = false;
    title = 'activity-tracker';
    today = new Date();

    setManual(event: MatSlideToggleChange): void {
        this.manual = event.checked;
    }
}
