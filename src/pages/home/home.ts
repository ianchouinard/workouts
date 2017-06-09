import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StateProvider } from "../../providers/state.provider";
import { WorkoutDetails } from "../workoutDetails/workoutDetails.component";
import { NewGroup } from "../newGroup/newgroup.component";
import { GroupView } from "../groupView/groupview.component";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public hasGroups: boolean;

  constructor(
    public navCtrl: NavController,
    private state: StateProvider) {}

    viewWorkoutDetails(workout) {
      this.navCtrl.push(WorkoutDetails, { workout: workout });
    }

    viewGroup(index) {
      this.navCtrl.push(GroupView, {group: this.state.Groups[index], index: index});
    }

    addNewGroup() {
      this.navCtrl.push(NewGroup);
    }

    ionViewWillEnter() {
      if (this.state.Groups.length) {
        this.hasGroups = true;
      } else {
        this.hasGroups = false;
      }
    }

}
