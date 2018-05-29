import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { ViewChild } from "@angular/core";
import { FabContainer, NavController, AlertController } from "ionic-angular";

export class Utils {
    statsRef: AngularFireList<any>;
    stats: Observable<any[]>;
    jugadorsRef: AngularFireList<any>;
    jugadors: Observable<any[]>;
    equipRef: AngularFireList<any>;
    equip: Observable<any[]>;
    jugadorsAPista = 0;
    statsTotals = {
        punts: 0,
        faltes: 0,
        rebots: 0,
        asistencies: 0
    };
    arrayJugadors = new Array;    

    @ViewChild('fab')fab : FabContainer;
       
    constructor(
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public database: AngularFireDatabase,
    ){

        this.statsRef = this.database.list('/equip/stats');
        this.stats = this.statsRef.snapshotChanges()
        .map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });

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

        this.jugadors.forEach((element) => {
            element.forEach(subelement => {
                this.arrayJugadors.push(subelement);
            })
        })
    }

    ngOnInit(){
        this.equipRef.valueChanges().subscribe(res => this.jugadorsAPista = res[1]);
        this.statsRef.valueChanges().subscribe(res => 
            this.statsTotals = {
                punts: res[2].value,
                faltes: res[1].value,
                asistencies: res[0].value,
                rebots: res[3].value
            });
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
        this.jugadorsRef.update(jugador.key, {
            dorsal: jugador.dorsal,
            aPista: 'expulsat'
        });
        this.jugadorsAPista--;
        this.equipRef.set('jugadorsAPista',this.jugadorsAPista); 
    }
}