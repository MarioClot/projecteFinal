import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Utils } from '../../app/utils';

@Component({
  selector: 'page-faltes',
  templateUrl: 'faltes.html'
})
export class FaltesPage extends Utils{
  
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase
  ) {
    super(navCtrl, alertCtrl, database);
  }

  addFalta(jugador) {
    this.jugadorsRef.update(jugador.key,{
        dorsal: jugador.dorsal,
        faltes: jugador.faltes+1
    });
    if(jugador.faltes==4){
      this.jugadorExpulsat(jugador);
      //this.jugadorsRef.update
    }
  }

  removeFalta(jugador) {
    this.jugadorsRef.update(jugador.key,{
        dorsal: jugador.dorsal,
        faltes: jugador.faltes-1
    });
  }
}  