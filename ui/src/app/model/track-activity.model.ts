import { ActivityType } from '../enums/activity-type.enum';

export interface TrackRequest {
    type: ActivityType;
    datetime?: string;
    format?: string;
}

export interface TrackResponse {
    message: string;
}
