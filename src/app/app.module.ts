import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { MyApp } from './app.component';

import { PuntsPage } from '../pages/punts/punts';
import { FaltesPage } from '../pages/faltes/faltes';
import { HomePage } from '../pages/home/home';
import { RebotsPage } from '../pages/rebots/rebots';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';

import { firebaseConfig } from '../config';

@NgModule({
  declarations: [
    MyApp,
    PuntsPage,
    FaltesPage,
    HomePage,
    TabsPage,
    RebotsPage,
    LoginPage,
    SignupPage
  ],
  imports: [
    NgxErrorsModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PuntsPage,
    FaltesPage,
    HomePage,
    TabsPage,
    RebotsPage,
    LoginPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    AngularFireAuth
  ]
})
export class AppModule {}
