import { Injectable } from '@angular/core';
import { HealthKit } from '@ionic-native/health-kit';

@Injectable()
export class HealthDataService {

    constructor (private healthKit: HealthKit) {

    }

    getHeartRates (start, end) {
        return this.healthKit.querySampleTypeAggregated({
            startDate: new Date(start), // three days ago
            endDate: new Date(end), // now
            sampleType: 'HKQuantityTypeIdentifierHeartRate',
            unit: 'count/min' 
        });
    }

    getStepCount (start, end) {
        return this.healthKit.querySampleTypeAggregated({
            startDate: new Date(start),
            endDate: new Date(end),
            sampleType: 'HKQuantityTypeIdentifierStepCount',
            unit: 'count'
        });
    }

}
