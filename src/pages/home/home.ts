import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, Nav } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController, public auth: AuthService) {
      this.auth = auth;
  }

  logout() {
    if(!this.auth.authenticated) {
      this.nav.setRoot(LoginPage);
    }
    this.auth.signOut();
  }

}
