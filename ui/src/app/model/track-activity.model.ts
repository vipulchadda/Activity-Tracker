import { ActivityType } from '../enums/activity-type.enum';

export interface TrackRequest {
    type: ActivityType;
    datetime: Date;
    timezone: string;
}

export interface TrackResponse {
    message: string;
}
