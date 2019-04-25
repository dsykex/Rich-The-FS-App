import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, Slide, NavOptions, DateTime, ActionSheetController } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import { Global } from '../../app/global';
import { AuthService } from '../../services/AuthService';
import { SettingsService } from '../../services/SettingsService';
import { Home } from '../home/home';

@Component({
  selector: 'page-book-session',
  templateUrl: 'book-session.html'
})

export class BookSession {
public user: any;
  public session: any = {};
  public sessions: any = [];
  currentYear: any = new Date().getFullYear();

  public settings: any;
  public price:number = 0;
  constructor(public navCtrl: NavController, public actionSheet: ActionSheetController, public settingsService: SettingsService, public authService: AuthService, public af: AngularFireDatabase)
  {

  }

  pop()
  {
    this.navCtrl.pop();
  }

  ngOnInit()
  {
    let sessionsList = this.af.list("Sessions");
    let sessionActive: boolean = false;
 
    this.settingsService.getSettings().subscribe(data => {
      console.log(data);
      this.settings = data;
    });

    this.authService.getUserInfo().subscribe(user => { 
      this.user = user;

      sessionsList.valueChanges(['child_added']).subscribe(data => {
          if(data.length > 0)
          {
            let mySession = data.filter(session =>  { return session['user'] == this.user.email; })[0];
          
            if(mySession != null)
            {
              console.log(this.user.email + ": Session already active..");
              this.navCtrl.pop();
            }
          }
        });
      });
  }

  public updateSessionInfo(time:string)
  {

    if(time)
    {
      var date = Date.parse(this.session.date + ', ' + this.session.sTime);

      this.price = this.session.hours * this.settings[0].pricePerHour;
      this.session.endDate = new Date(date+(this.session.hours * 3600000)).toDateString();
      var sTime = this.toStandardTime(this.session.sTime); 
      this.session.endTime = this.toStandardTime(new Date(date+(this.session.hours * 3600000)).toTimeString());
      this.session.startTime = sTime;
    }
  }

  public toStandardTime(time: string)
  {
    var timeSplit = time.split(':');
    var hours = Number(timeSplit[0]);
    var minutes = Number(timeSplit[1]);

    // calculate
    var timeValue;

    if (hours > 0 && hours <= 12) {
      timeValue= "" + hours;
    } else if (hours > 12) {
      timeValue= "" + (hours - 12);
    } else if (hours == 0) {
      timeValue= "12";
    }
    
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM
  
    return timeValue;
  }

  bookSession()
  {
    if(this.session.date && this.session.startTime && this.session.endTime && this.session.hours)
    {
        this.session.user = this.user.email;

        let sessionsList = this.af.list("Sessions");
        switch(this.session.payment)
        {
          case 'cash':
          {
            console.log("CASH COW!");

          }break;
          case 'cashapp':
          {
            console.log('CASH APP ME DAWG');
          }break;
          case 'paypal':
          {
            console.log('PAYPAL IS MY BF!');
          } break;
        }
        
        sessionsList.push(this.session);
        
        setTimeout(() => {
          this.navCtrl.setRoot(Home);
        }, 1500);
    }
  }

  handlePayPalPayment()
  {
    
  }
}
