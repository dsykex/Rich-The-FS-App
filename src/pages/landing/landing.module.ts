import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Landing } from './landing';

@NgModule({
  declarations: [
    Landing,
  ],
  imports: [
    IonicPageModule.forChild(Landing),
  ],
})
export class LandingPageModule {}
