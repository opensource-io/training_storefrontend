import { Instructor } from './instructor';
import { Address } from './address';
import { Sku } from './sku';

export interface ClassSession {
    classSessionKey?: number;
    classSessionSku?: Sku;
    classSessionAddress?: Address;
    classSessionInstructor?: Instructor;
    classSessionStartDate?: string;
    classSessionStartTime?: string;
    classSessionEndTime?: string;
    classSessionTimeZone?: string;
}
