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

  onSelect() {
    if (this.dorsals.length>12) {
      let alert = this.alertCtrl.create({
        title: 'Maxim 12 convocats',
        subTitle: 'Nomes pot haver 12 jugadors convocats',
        buttons: ['OK']
      });
      alert.present();
      this.dorsals = [];
    }
  }

  createPlayers() {
    if(this.arrayJugadors.length<12) {
        this.dorsals.forEach(dorsal => {
          this.database.object(`equip/jugadors/${dorsal}`).update({
            aPista: false,
            dorsal: parseInt(dorsal),
            punts: 0,
            faltes: 0,
            asistencies: 0,
            rebots: 0
          });
        })
      let alert = this.alertCtrl.create({
        title: this.dorsals.length+' jugadors creats',
        subTitle: 'S\'han creat '+this.dorsals.length+' jugadors correctament',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  emptyDB() {
    this.arrayJugadors.forEach((element) => {
      this.jugadorsRef.remove(element.key);
    })
    this.equipRef.set('jugadorsAPista',0);
    this.statsTotals = {
      punts: 0,
      faltes: 0,
      rebots: 0,
      asistencies: 0
    }
    this.equipRef.update('stats', {
      puntsTotals: 0,
      faltesTotals: 0,
      rebotsTotals: 0,
      asistenciesTotals: 0
    })
  }
}
