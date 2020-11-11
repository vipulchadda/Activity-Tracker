import { Activity } from 'src/app/model/activity.model';
import { ActivityType } from 'src/app/enums/activity-type.enum';
import { ApiService } from 'src/app/services/api.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy {
    @Input() activityLogged: Observable<void>;
    @Input() date: Date;

    activityType = ActivityType;
    loading = false;
    summary: Activity;

    private $activityLogged: Subscription;

    constructor(private apiService: ApiService) {}

    ngOnInit(): void {
        this.getSummary();
        this.$activityLogged = this.activityLogged.subscribe(() => this.getSummary());
    }

    ngOnDestroy(): void {
        this.$activityLogged.unsubscribe();
    }

    private getSummary() {
        this.loading = true;
        this.apiService
            .getSummary(this.date)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe((resp) => {
                this.summary = {
                    PEE: resp.PEE.sort(),
                    FOOD: resp.FOOD.sort(),
                    POOP: resp.POOP.sort(),
                    WALK: resp.WALK.sort()
                };
            });
    }
}
