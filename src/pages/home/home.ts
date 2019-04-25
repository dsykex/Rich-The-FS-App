import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, Slide, LoadingController, AlertController } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import {Global} from '../../app/global';
import {Beats} from '../beats/beats';
import {BookSession} from '../book-session/book-session';
import { AuthService } from '../../services/AuthService';
import { Login } from '../login/login';
import { UserPage } from '../user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {

  @ViewChild("slides") slides: Slides;
  public slideBgs : any = ['../../assets/imgs/studio.jpg', '../../assets/imgs/beats.jpg']
  slideImg: any;
  user: any = {};

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public loadCtrl: LoadingController, public authService: AuthService, public af: AngularFireDatabase)
  {

  }

  ngOnInit()
  {
    this.authService.getUserInfo().subscribe(user => {
      if(user)
        this.user = user;
    });

    this.slideImg = this.slideBgs[0];
  }

  openPage(page)
  {
    this.navCtrl.push(page);
  }

  bookSession()
  {
    let sessionSub = this.af.list("Sessions").valueChanges(['child_added']).subscribe(data => {
      let session = data.filter(s => {return s['email'] == this.user.email})[0];
      console.log(session);
      if(session!=null)
      {
        let sessionAlert = this.alertCtrl.create({
          message: 'You already have a session.',
          buttons: [
            {
              text: 'Session Details',
              handler: () => {
                this.navCtrl.push(UserPage);
              }
            },
            {
              text: 'Dismiss',
              role: 'cancel',
              handler: () => {
                console.log('Buy clicked');
              }
            }
          ]
        });

        sessionAlert.present();
      }

    });
    sessionSub.unsubscribe();
    this.navCtrl.push(BookSession);
  }

  beats()
  {
    this.navCtrl.push(Beats);
  }

  logout()
  {
    this.authService.logout().then(() => {
      this.user = null;
      let loader = this.loadCtrl.create({
        content: 'Signing out..'
      });
      loader.present();
      setTimeout(() => {
        loader.dismiss();
        this.navCtrl.setRoot(Login);
      }, 3000);
    });
  }
  
  userPage()
  {
    this.navCtrl.push(UserPage);
  }

  slideChanged()
  {
    var index = this.slides.getActiveIndex();
    console.log(this.authService.isAdmin(this.user));
    this.slideImg = this.slideBgs[index];
  }
}
