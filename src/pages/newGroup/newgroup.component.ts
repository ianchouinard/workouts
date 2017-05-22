import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GroupModel } from "../../models/group.model";
import { WorkoutModel } from "../../models/workout.model";
import { StateProvider } from "../../providers/state.provider";
import { GroupView } from "../groupView/groupview.component";

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
        private state: StateProvider) {}

    createNewGroup () {
        for (let item of this.selected) {
            this.FormModel.workouts.push(this.workouts[item]);
        }
        this.state.Groups.push(this.FormModel);
        // this.storage.saveGroups();
        // Use state instead of newly made form model
        let addedIndex = (this.state.Groups.length - 1);
        this.navCtrl.push(GroupView, { group:  this.state.Groups[addedIndex]});
    }

    ngOnInit () {
        this.workouts = this.state.Model;
        this.selected = [];
        this.FormModel = new GroupModel();
        this.FormModel.workouts = new Array<WorkoutModel>();
    }

}
