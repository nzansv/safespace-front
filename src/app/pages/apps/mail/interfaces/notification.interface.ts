import {DateTime} from 'luxon';

export interface Notification {
    id: number;
    topic: string;
    content: string;
    createdAt: DateTime;
    seen: boolean;
    userId: number;
}
