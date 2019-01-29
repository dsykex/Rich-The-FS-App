import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Beats } from './beats';

@NgModule({
  declarations: [
    Beats,
  ],
  imports: [
    IonicPageModule.forChild(Beats),
  ],
})
export class BeatsPageModule {}
