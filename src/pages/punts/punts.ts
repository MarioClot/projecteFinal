import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Utils } from '../../app/utils';

@Component({
  selector: 'page-punts',
  templateUrl: 'punts.html'
})
export class PuntsPage extends Utils{

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase
  ) {
    super(navCtrl, alertCtrl, database);
  }

  addPunt(jugador) {
    this.jugadorsRef.update(jugador.key,{
        dorsal: jugador.dorsal,
        punts: jugador.punts+1
    });
    this.statsTotals.punts++;
    this.statsRef.update('puntsTotals',{
      value: this.statsTotals.punts
    });
  }

  removePunt(jugador) {
    this.jugadorsRef.update(jugador.key,{
        dorsal: jugador.dorsal,
        punts: jugador.punts-1
    });
    this.statsTotals.punts--;
    this.statsRef.update('puntsTotals',{
      value: this.statsTotals.punts
    });   
  }
}
