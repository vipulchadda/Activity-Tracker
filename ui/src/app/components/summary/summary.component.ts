import { Activity } from 'src/app/model/activity.model';
import { ActivityType } from 'src/app/enums/activity-type.enum';
import { ApiService } from 'src/app/services/api.service';
import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
    @Input() date: Date;
    activityType = ActivityType;
    loading = false;
    summary: Activity;

    constructor(private apiService: ApiService) {}

    ngOnInit(): void {
        this.getSummary();
    }

    private getSummary() {
        this.loading = true;
        this.apiService
            .getSummary(this.date)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe((resp) => (this.summary = resp));
    }
}
