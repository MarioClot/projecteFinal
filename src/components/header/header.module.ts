import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HeaderComponent } from './header';

@NgModule({
  declarations: [
    HeaderComponent,
   ],
  imports: [
    IonicModule,
  ],
  exports: [
    HeaderComponent
  ],
  entryComponents:[
    HeaderComponent
  ]
})
export class HeaderComponentModule {}