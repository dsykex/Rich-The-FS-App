import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import { Global } from '../../app/global';

@Component({
  selector: 'page-beats',
  templateUrl: 'beats.html'
})

export class Beats {
  public user: any;
  constructor(public navCtrl: NavController, public af: AngularFireDatabase) {
   
    
  }

  ngOnInit()
  {
    /*this.getUserInfo().subscribe(userData => {
      this.user = userData;
    });*/

    console.log(this.user);
  }

  public pop()
  {
    this.navCtrl.pop();
  }
}
