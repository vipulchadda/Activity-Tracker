import { ActivityType } from 'src/app/enums/activity-type.enum';
import { ApiService } from 'src/app/services/api.service';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-log-button',
    templateUrl: './log-button.component.html',
    styleUrls: ['./log-button.component.scss']
})
export class LogButtonComponent {
    @Input() type: ActivityType;

    constructor(private apiService: ApiService) {}

    click() {
        this.apiService.trackActivity(this.type);
    }
}
