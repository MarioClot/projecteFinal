import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, IonicPageModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { PuntsPage } from '../pages/punts/punts';
import { FaltesPage } from '../pages/faltes/faltes';
import { HomePage } from '../pages/home/home';
import { RebotsPage } from '../pages/rebots/rebots';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

export const firebaseConfig = {
  apiKey: "AIzaSyAVWm2l2gnjPghiwgtngjZ61HELQ5Y8qNw",
  authDomain: "projecte-final-ionic.firebaseapp.com",
  databaseURL: "https://projecte-final-ionic.firebaseio.com",
  projectId: "projecte-final-ionic",
  storageBucket: "projecte-final-ionic.appspot.com",
  messagingSenderId: "786740284616"
};

@NgModule({
  declarations: [
    MyApp,
    PuntsPage,
    FaltesPage,
    HomePage,
    TabsPage,
    RebotsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig,'demo104'),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PuntsPage,
    FaltesPage,
    HomePage,
    TabsPage,
    RebotsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
