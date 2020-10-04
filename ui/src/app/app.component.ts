import { Component } from '@angular/core';
import { ActivityType } from './enums/activity-type.enum';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'activity-tracker';

    activityType = ActivityType;
}
