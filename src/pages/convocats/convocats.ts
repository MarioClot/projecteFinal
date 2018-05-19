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
  dorsals: Array<string>;
  rootPage;
  
  @ViewChild(Nav) nav: Nav;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public database: AngularFireDatabase,
    public alertCtrl: AlertController) {
    super(navCtrl, alertCtrl, database);
  }

  goToApp() {
    if (this.dorsals){
      this.createPlayers()
    }
      this.navCtrl.setRoot(TabsPage);
  }

  createPlayers() {
    //var dorsal = 20;
    console.log(this.dorsals);
    this.dorsals.forEach(dorsal => {
      console.log(dorsal);
      this.database.object(`equip/jugadors/${dorsal}`).update({
        aPista: false,
        dorsal: parseInt(dorsal),
        punts: 0,
        faltes: 0,
        asistencies: 0,
        rebots: 0
      });
    })
  }
}
