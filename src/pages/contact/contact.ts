import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HealthKit } from '@ionic-native/health-kit';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(
    public navCtrl: NavController,
    private healthKit: HealthKit) {
  }

  test () {
    console.log('bigggd');
    this.resulter();
  }

  private resulter () {
    this.healthKit.findWorkouts().then(result => {
      console.log('result got');
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

}
