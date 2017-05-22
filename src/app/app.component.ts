import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StateProvider } from '../providers/state.provider';
import { TabsPage } from '../pages/tabs/tabs';
import { WorkoutsService } from "../services/workouts.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private state: StateProvider,
    private _workoutsService: WorkoutsService) {
    platform.ready().then(() => {
      statusBar.styleLightContent();
      splashScreen.hide();
      this.state.initializeApp();
      this._workoutsService.getWorkouts();
    });
  }
}
