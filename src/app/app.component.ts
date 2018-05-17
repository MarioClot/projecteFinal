import { Component } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { LoginPage } from '../pages/login/login';
import { AuthService } from '../services/auth.service';
import { ConvocatsPage } from '../pages/convocats/convocats';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage;

  private platform;


  constructor(app: App, platform: Platform,
    private statusBar: StatusBar,
    private auth: AuthService) {
      this.platform = platform;
      this.initializeApp();

    }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });
  
    this.auth.afAuth.authState
      .subscribe(
        user => {
          if (user) {
            this.rootPage = ConvocatsPage;
          } else {
            this.rootPage = LoginPage;
          }
        },
        () => {
          this.rootPage = LoginPage;
        }
      );
  }
}
