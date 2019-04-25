import { Component, enableProdMode } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Home } from '../pages/home/home';
import { Landing } from '../pages/landing/landing';
import { ResDataPage } from '../pages/res-data/res-data';
import { Login } from '../pages/login/login';
import {timer} from 'rxjs/observable/timer';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = Landing;
  showSplash = true;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) 
  {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      timer(3300).subscribe(() => {
        this.showSplash = false;
      });
    });
  }
}

