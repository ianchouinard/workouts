import { Injectable } from '@angular/core';
import { HealthKit } from '@ionic-native/health-kit';
import { StateProvider } from "../providers/state.provider";
import { WorkoutModel } from "../models/workout.model";

@Injectable()
export class WorkoutsService {

    constructor(
        private healthKit: HealthKit,
        private state: StateProvider) {}

    getWorkouts () {
        this.healthKit.findWorkouts().then(result => {
            this.parseWorkoutsData(result);
        }, error => {
            // console.log("ERROR -> " + JSON.stringify(error));
            this.parseWorkoutsData(error);
        });
    }

    private parseWorkoutsData (data) {
        let workouts = new Array<WorkoutModel>();
        let wk;

        for (let workout of data) {
            wk = new WorkoutModel();
            wk.id = workout.startDate + Math.random();
            wk.startTime = workout.startDate;
            wk.endTime = workout.endDate;
            wk.date = workout.startDate.split('T')[0];
            wk.miles = parseInt(workout.miles);
            wk.duration = workout.duration;
            wk.calories = WorkoutsService.parseCalories(workout.calories);
            wk.activityType = WorkoutsService.parseActivityType(workout.activityType);
            workouts.push(wk);
        }

        workouts.reverse();
        this.state.saveWorkouts(workouts);
    }

    private static parseActivityType (type: string):string {
        let output = "";

        switch(type) {
            case 'HKWorkoutActivityTypeWalking':
                output = "Walk";
                break;
            case 'HKWorkoutActivityTypeRunning':
                output = "Run";
                break;
            case 'HKWorkoutActivityTypeSwimming':
                output = "Swim";
                break;
            default:
                output = "Workout";
                break;
        }

        return output;
    }

    private static parseCalories (calories: string):number {
        let output;

        let caloriesRaw = calories.replace(/[^\d.-]/g, '');
        let caloriesInt = parseInt(caloriesRaw);
        output = Math.round(caloriesInt);

        return output;
    }

}
