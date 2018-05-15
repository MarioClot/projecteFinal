import { Component } from '@angular/core';
import { AlertController, NavController, Platform } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { Utils } from '../../app/utils';
import { AngularFireDatabase } from 'angularfire2/database';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends Utils{
  pdfObj = null;
  arrayJugadors = new Array;
  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController, 
    private plt: Platform,
    public auth: AuthService,
    public database: AngularFireDatabase,
    private file: File, 
    private fileOpener: FileOpener
  ) {
    super(navCtrl, alertCtrl, database);
      this.auth = auth;
      this.jugadors.forEach((element) => {
        element.forEach(subElement => {
          //console.log(subElement);
          this.arrayJugadors.push(subElement);
        });
      });
  }

  logout() {
    this.auth.signOut();
  }

  generatePDF(){
    // TODO: this.arrayJugadors estan els jugadors guardats, on puc
    //      accedir a dorsal, punts...
    /*var docDefinition = {
      content: [

      ],
      styles: {

      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);*/ 
  }
}
