import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { BookSession } from '../pages/book-session/book-session';
import { Beats } from '../pages/beats/beats';
import { Landing } from '../pages/landing/landing';
import { AuthService } from '../services/AuthService';
import { ResDataPage } from '../pages/res-data/res-data';
import { Login } from '../pages/login/login';
import { SettingsService } from '../services/SettingsService';

export const  fbConfig = {
  apiKey: "AIzaSyAT2j-HxrOKxnTS8m7yotXnrl0mJADJiMk",
  authDomain: "firestarter-9c73c.firebaseapp.com",
  databaseURL: "https://firestarter-9c73c.firebaseio.com",
  projectId: "firestarter-9c73c",
  storageBucket: "firestarter-9c73c.appspot.com",
  messagingSenderId: "115304164573"
}

@NgModule({
  declarations: [
    MyApp,
    Home,
    Beats,
    BookSession,
    Landing,
    ResDataPage,
    Login

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(fbConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    Beats,
    BookSession,
    Landing,
    ResDataPage,
    Login
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    SettingsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
