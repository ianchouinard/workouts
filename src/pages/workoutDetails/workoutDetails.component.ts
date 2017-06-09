import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HealthDataService } from "../../services/healthdata.service";
import { WorkoutModel } from "../../models/workout.model";

@Component({
  selector: 'workout-details',
  templateUrl: 'workoutDetails.component.html'
})
export class WorkoutDetails {

  public debugcrap: string;
  public steps: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private healthData: HealthDataService) {}

    public workout:WorkoutModel = this.navParams.get('workout');

    ngOnInit () {
      console.log('gettin temp');
      /*
      this.healthData.getHeartRates(this.workout.startTime, this.workout.endTime)
      .then(healthData => {
          console.log('hr_data');
          console.log(healthData);
          this.debugcrap = JSON.stringify(healthData);
        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));
        });
        */
        this.healthData.getStepCount(this.workout.startTime, this.workout.endTime)
        .then(healthData => {
          console.log('hr_data');
          console.log(healthData);
          this.debugcrap = JSON.stringify(healthData);
          this.steps = Math.round(healthData[0].quantity);
        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    }

}
