import { Component } from '@angular/core';
import { Utils } from '../../app/utils';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

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
  }
}