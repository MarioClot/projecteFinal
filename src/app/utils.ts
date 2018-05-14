import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { ViewChild } from "@angular/core";
import { FabContainer, NavController, AlertController } from "ionic-angular";

export class Utils {
    jugadorsRef: AngularFireList<any>;
    jugadors: Observable<any[]>;
    equipRef: AngularFireList<any>;
    equip: Observable<any[]>;
    jugadorsAPista = 0;

    @ViewChild('fab')fab : FabContainer;
       
    constructor(
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public database: AngularFireDatabase,
    ){
        this.jugadorsRef = this.database.list('/equip/jugadors');
        this.jugadors = this.jugadorsRef.snapshotChanges()
        .map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });

        this.equipRef = this.database.list('equip');
        this.equip = this.equipRef.snapshotChanges()
        .map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });
    }

    ngOnInit(){
        this.equipRef.valueChanges().subscribe(res => this.jugadorsAPista = res[1]);
    }

    jugadorForaPista(jugador){
      
        this.jugadorsRef.update( jugador.key,{
          dorsal: jugador.dorsal,
          aPista: !jugador.aPista
        });
        this.jugadorsAPista--;
        this.fab.close();
        this.equipRef.set('jugadorsAPista',this.jugadorsAPista);
      }

    jugadorEntraPista(jugador){
        if(this.jugadorsAPista < 5){
            this.jugadorsRef.update(jugador.key,{
                dorsal: jugador.dorsal,
                aPista: true
            });
            this.jugadorsAPista++;
            this.fab.close();
        } else {
            let alert = this.alertCtrl.create({
                title: 'Maxim 5 jugadors',
                subTitle: 'A pista nomes poden haver 5 jugadors',
                buttons: ['OK']
            });
            alert.present();
            
        }
        this.equipRef.set('jugadorsAPista',this.jugadorsAPista);       
    }

    jugadorExpulsat(jugador){
        console.log("hei")
        this.jugadorsRef.update(jugador.key, {
            dorsal: jugador.dorsal,
            aPista: 'expulsat'
        });
        this.jugadorsAPista--;
        this.equipRef.set('jugadorsAPista',this.jugadorsAPista); 
    }
}