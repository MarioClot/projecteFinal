import { Component } from '@angular/core';
import { Utils } from '../../app/utils';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent extends Utils {


  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase
  ) {
    super(navCtrl, alertCtrl, database);


    // TODO crear camps punts, faltes, asistencies, rebots totals a Firebase
    // this.equipRef.valueChanges().subscribe(res => this.statsTotals = res[2]);
  }
}