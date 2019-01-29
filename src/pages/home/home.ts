import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, Slide, LoadingController } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import {Global} from '../../app/global';
import {Beats} from '../beats/beats';
import {BookSession} from '../book-session/book-session';
import { AuthService } from '../../services/AuthService';
import { Login } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {

  @ViewChild("slides") slides: Slides;
  public slideBgs : any = ['../../assets/imgs/studio.jpg', '../../assets/imgs/beats.jpg']
  slideImg: any;
  user: any = {};

  constructor(public navCtrl: NavController, public loadCtrl: LoadingController, public authService: AuthService, public af: AngularFireDatabase)
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

  slideChanged()
  {
    var index = this.slides.getActiveIndex();
    console.log(this.authService.isAdmin(this.user));
    this.slideImg = this.slideBgs[index];
  }
}
