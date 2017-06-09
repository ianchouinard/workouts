import { Injectable } from '@angular/core';
import { WorkoutModel } from "../models/workout.model";
import { GroupModel } from "../models/group.model";

@Injectable()
export class StateProvider {

    public Workouts: Array<WorkoutModel>;
    public Groups: Array<GroupModel>;

    constructor() {}

    initializeApp () {
        this.Workouts = new Array<WorkoutModel>();
        this.Groups = new Array<GroupModel>();
    }

    saveWorkouts (workouts: Array<WorkoutModel>) {
        this.Workouts = workouts;
    }

}
