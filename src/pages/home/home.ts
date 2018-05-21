import { Component } from '@angular/core';
import { AlertController, NavController, Platform } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { Utils } from '../../app/utils';
import { AngularFireDatabase } from 'angularfire2/database';
import { ConvocatsPage } from '../convocats/convocats';

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
  }

  logout() {
    this.auth.signOut();
  }

  goToConvocats() {
    this.navCtrl.setRoot(ConvocatsPage);
  }

  generatePDF(){
    var body = [['Dorsal', 'Punts', 'Faltes', 'Rebots', 'Asistencies']];

    this.arrayJugadors.forEach((element) => {
      body.push([{text: element.key, style: 'tableKey'}, element.punts, element.faltes, element.rebots, element.asistencies])
    })

    var docDefinition = {
      content: {
          style: 'tablezebra',
          table: {
            body
          },
          layout: {
            fillColor: function (i, node) {
              if( i == 0 )
                return '#8E8E8E';
              else
                return (i % 2 === 0) ? '#CCCCCC' : null;
            }
          }
      },
      styles: {
        tablezebra: {
          margin: [0, 5, 0, 15]
        },
        tableKey: {
          bold: true,
          color: 'black',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }

  downloadPdf() {
    this.generatePDF();
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
        this.file.writeFile(this.file.dataDirectory, 'stats.pdf', blob, { replace: true }).then(fileEntry => {
          this.fileOpener.open(this.file.dataDirectory + 'stats.pdf', 'application/pdf');
        })
      });
    } else {
      this.pdfObj.download();
    }
  }
}
