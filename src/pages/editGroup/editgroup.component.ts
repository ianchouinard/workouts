import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GroupModel } from "../../models/group.model";
import { WorkoutModel } from "../../models/workout.model";
import { StateProvider } from "../../providers/state.provider";
import { GroupView } from "../groupView/groupview.component";
import { StorageService } from "../../services/storage.service";

@Component({
  selector: 'edit-group',
  templateUrl: 'editgroup.component.html'
})
export class EditGroup {

    public workouts: Array<WorkoutModel>;
    public startTimes: any;
    public workoutList: any;
    public selected: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private state: StateProvider,
        private store: StorageService) {}

    public Group:GroupModel = this.navParams.get('group');

    saveChanges () {
        this.Group.workouts = new Array<WorkoutModel>();

        for (let item of this.selected) {
            this.Group.workouts.push(this.state.Workouts[item]);
        }

        this.Group.workoutQuantity = this.Group.workouts.length;
        this.store.saveGroups();
        this.navCtrl.push(GroupView, { group: this.Group});
    }

    private createWorkoutList () {
        this.selected = [];
        this.startTimes = [];
        this.workoutList = [];

        for (let workout of this.Group.workouts) {
            this.startTimes.push(workout.startTime);
        }

        for (let i = 0; i < this.state.Workouts.length; i++) {
            this.workoutList.push(this.state.Workouts[i]);
            if (this.startTimes.includes(this.state.Workouts[i].startTime)) {
                this.selected.push(i);
            } 
        }

    }

    ionViewWillEnter () {
        this.createWorkoutList();
    }

}
