import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HealthKit } from '@ionic-native/health-kit';
import { IonicStorageModule } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StateProvider } from "../providers/state.provider";
import { WorkoutsService } from "../services/workouts.service";
import { WorkoutDetails } from "../pages/workoutDetails/workoutDetails.component";
import { HealthDataService } from "../services/healthdata.service";
import { NewGroup } from "../pages/newGroup/newgroup.component";
import { StorageService } from "../services/storage.service";
import { GroupView } from "../pages/groupView/groupview.component";
import { EditGroup } from "../pages/editGroup/editgroup.component";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    WorkoutDetails,
    NewGroup,
    GroupView,
    EditGroup
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    WorkoutDetails,
    TabsPage,
    NewGroup,
    GroupView,
    EditGroup
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HealthKit,
    StateProvider,
    WorkoutsService,
    HealthDataService,
    StorageService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
