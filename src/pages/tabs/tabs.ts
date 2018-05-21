import { Component } from '@angular/core';

import { PuntsPage } from '../punts/punts';
import { FaltesPage } from '../faltes/faltes';
import { HomePage } from '../home/home';
import { RebotsPage } from '../rebots/rebots';
import { AsistenciesPage } from '../asistencies/asistencies';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PuntsPage;
  tab3Root = FaltesPage;
  tab4Root = RebotsPage;
  tab5Root = AsistenciesPage;

  constructor() {

  }
}
