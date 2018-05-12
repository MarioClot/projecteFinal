import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ViewChild } from '@angular/core';
import { FabContainer } from 'ionic-angular/components/fab/fab-container';

@Component({
  selector: 'page-rebots',
  templateUrl: 'rebots.html'
})
export class RebotsPage{

  jugadorsRef: AngularFireList<any>;
  jugadors: Observable<any[]>;

  @ViewChild('fab')fab : FabContainer;


  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase
  ) {
    super();
    this.jugadorsRef = this.database.list('jugadors');
    this.jugadors = this.jugadorsRef.snapshotChanges()
    .map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  jugadorForaPista( jugador ){
    this.jugadorsRef.update( jugador.key,{
      dorsal: jugador.dorsal,
      aPista: !jugador.aPista
    });
    this.fab.close();
  }

  jugadorAPista(jugador){
    this.jugadorsRef.update(jugador.key,{
      dorsal: jugador.dorsal,
      aPista: true
    });
    this.fab.close();
  }

  addRebot( jugador) {
    this.jugadorsRef.update(jugador.key,{
      dorsal: jugador.dorsal,
      rebots: jugador.rebots+1
    });
  }

  removeRebot( jugador) {
    this.jugadorsRef.update(jugador.key,{
      dorsal: jugador.dorsal,
      rebots: jugador.rebots-1
    });
  }
}