import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StateProvider } from "../../providers/state.provider";
import { WorkoutDetails } from "../workoutDetails/workoutDetails.component";
import { NewGroup } from "../newGroup/newgroup.component";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private state: StateProvider) {}

    viewWorkoutDetails(workout) {
      console.log('gettin');
      this.navCtrl.push(WorkoutDetails, { workout: workout });
    }

    addNewGroup() {
      this.navCtrl.push(NewGroup);
    }

}
