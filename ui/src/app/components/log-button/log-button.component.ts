import { Component, OnInit, Input } from '@angular/core';
import { ActivityType } from 'src/app/enums/activity-type.enum';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-log-button',
  templateUrl: './log-button.component.html',
  styleUrls: ['./log-button.component.scss'],
})
export class LogButtonComponent implements OnInit {
  @Input() type: ActivityType;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  click() {
    this.apiService.trackActivity(this.type);
  }
}
