import { WorkoutModel } from "./workout.model";

export class GroupModel {
    title: string;
    location: string;
    mainActivity: string;
    workouts: Array<WorkoutModel>;
    workoutQuantity: number;
}
