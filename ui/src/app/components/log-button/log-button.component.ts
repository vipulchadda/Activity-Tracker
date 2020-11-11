import { ActivityType } from 'src/app/enums/activity-type.enum';
import { ApiService } from 'src/app/services/api.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-log-button',
    templateUrl: './log-button.component.html',
    styleUrls: ['./log-button.component.scss']
})
export class LogButtonComponent {
    @Input() manual?: boolean;
    @Input() manualTime?: any;
    @Input() type: ActivityType;

    @Output() activityLogged = new EventEmitter<boolean>();

    loading = false;

    constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

    click() {
        this.loading = true;
        this.apiService
            .trackActivity(this.type, this.manual, this.manualTime)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe(
                () => {
                    this.openSnackbar('Save successful');
                    this.activityLogged.emit(true);
                },
                (error: HttpErrorResponse) => {
                    this.openSnackbar(`Save failed. Error: ${error.message}`);
                }
            );
    }

    private openSnackbar(message: string): void {
        this.snackBar.open(message, null, { duration: 3000 });
    }
}
