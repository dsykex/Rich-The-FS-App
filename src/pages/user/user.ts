import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';

import {AuthService} from '../../services/AuthService';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  public user: any = {};
  public session: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase, public authService: AuthService)
  {
  
  }

  ngOnInit()  
  {
      this.authService.getUserInfo().subscribe(userInfo => {
        console.log(userInfo);
        if(!userInfo.email)
        {
          console.log('Session Expiered');
        }
        else
        {
          console.log('User Active');
          this.user = userInfo;
        }
      });
  }

  hasSession()
  {
    let sessionSub = this.af.list("Sessions").valueChanges(['child_added']).subscribe(data => {
      let session = data.filter(s => { return s['user'] == this.user.email })[0];
      
      if(session != null)
        return true;
      else
        return false;
    });
    sessionSub.unsubscribe();
  }

  pop()
  {
      this.navCtrl.pop();
  }

  deleteSession() {

  }

  updateSession(){

  }
  

}
