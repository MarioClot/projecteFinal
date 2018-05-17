import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Utils } from '../../app/utils';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-convocats',
  templateUrl: 'convocats.html',
})
export class ConvocatsPage extends Utils {

  rootPage;
  
  @ViewChild(Nav) nav: Nav;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public database: AngularFireDatabase,
    public alertCtrl: AlertController) {
    super(navCtrl, alertCtrl, database);
  }

  goToApp() {
    this.navCtrl.setRoot(TabsPage);
  }
}
