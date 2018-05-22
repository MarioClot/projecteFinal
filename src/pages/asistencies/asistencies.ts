import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Utils } from '../../app/utils';

@Component({
  selector: 'page-asistencies',
  templateUrl: 'asistencies.html'
})
export class AsistenciesPage extends Utils{

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase
  ) {
    super(navCtrl, alertCtrl, database);
  }

  addAsist(jugador) {
    this.jugadorsRef.update(jugador.key,{
        dorsal: jugador.dorsal,
        asistencies: jugador.asistencies+1
    });
    this.statsTotals.asistencies++;
    this.statsRef.update('asistenciesTotals',{
      value: this.statsTotals.asistencies
    });
  }

  removeAsist(jugador) {
    this.jugadorsRef.update(jugador.key,{
        dorsal: jugador.dorsal,
        asistencies: jugador.asistencies-1
    });
    this.statsTotals.asistencies--;
    this.statsRef.update('asistenciesTotals',{
      value: this.statsTotals.asistencies
    });
  }

}