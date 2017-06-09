import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GroupModel } from "../../models/group.model";
import { WorkoutModel } from "../../models/workout.model";
import { StateProvider } from "../../providers/state.provider";
import { GroupView } from "../groupView/groupview.component";
import { StorageService } from "../../services/storage.service";

@Component({
  selector: 'new-group',
  templateUrl: 'newgroup.component.html'
})
export class NewGroup {

    public FormModel: GroupModel;
    public workouts: Array<WorkoutModel>;
    public selected: any;

    constructor(
        public navCtrl: NavController,
        private state: StateProvider,
        private store: StorageService) {}

    createNewGroup () {
        for (let item of this.selected) {
            this.FormModel.workouts.push(this.workouts[item]);
        }
        this.FormModel.workoutQuantity = this.FormModel.workouts.length;
        this.state.Groups.unshift(this.FormModel);
        this.store.saveGroups();
        // Use state instead of newly made form model
        this.navCtrl.push(GroupView, { group:  this.state.Groups[0], index: 0});
    }

    ngOnInit () {
        this.workouts = this.state.Workouts;
        this.selected = [];
        this.FormModel = new GroupModel();
        this.FormModel.workouts = new Array<WorkoutModel>();
    }

}
