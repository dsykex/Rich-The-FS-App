import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookSession } from './book-session';

@NgModule({
  declarations: [
    BookSession,
  ],
  imports: [
    IonicPageModule.forChild(BookSession),
  ],
})
export class BookSessionPageModule {}
