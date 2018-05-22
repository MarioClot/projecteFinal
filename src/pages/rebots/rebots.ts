import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Utils } from '../../app/utils';

@Component({
  selector: 'page-rebots',
  templateUrl: 'rebots.html'
})
export class RebotsPage extends Utils{

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase
  ) {
    super(navCtrl, alertCtrl, database);
  }

  addRebot(jugador) {
    this.jugadorsRef.update(jugador.key,{
        dorsal: jugador.dorsal,
        rebots: jugador.rebots+1
    });
    this.statsTotals.rebots++;
    this.statsRef.update('rebotsTotals',{
      value: this.statsTotals.rebots
    });
  }

  removeRebot(jugador) {
    this.jugadorsRef.update(jugador.key,{
        dorsal: jugador.dorsal,
        rebots: jugador.rebots-1
    });
    this.statsTotals.rebots--;
    this.statsRef.update('rebotsTotals',{
      value: this.statsTotals.rebots
    });
  }

}