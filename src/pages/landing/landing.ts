import { Component } from '@angular/core';
import { NavController, AlertController, AlertOptions } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';

import * as firebase from 'firebase';
import { Home } from '../home/home';
import {AuthService} from '../../services/AuthService';
import { Login } from '../login/login';

@Component({
  selector: 'landing',
  templateUrl: 'landing.html',
})

export class Landing 
{
  constructor(public authService: AuthService, public navCtrl: NavController, public af: AngularFireDatabase, public alertCtrl: AlertController)
  {
 
  }

  ngOnInit()
  {
    this.authService.getUserInfo().subscribe(user => {
      console.log(user);
      if(user.email)
      {
        this.navCtrl.setRoot(Home);
      }else
      {
        this.navCtrl.setRoot(Login);
      }
    });
  }

}

