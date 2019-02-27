import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, Slide, NavOptions, DateTime } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import { Global } from '../../app/global';
import { AuthService } from '../../services/AuthService';
import { SettingsService } from '../../services/SettingsService';

@Component({
  selector: 'page-book-session',
  templateUrl: 'book-session.html'
})

export class BookSession {
public user: any;
  public session: any = {};
  currentYear: any = new Date().getFullYear();

  public settings: any;
  public price:number = 0;
  constructor(public navCtrl: NavController, public settingsService: SettingsService, public authService: AuthService, public af: AngularFireDatabase)
  {

  }

  pop()
  {
    this.navCtrl.pop();
  }

  ngOnInit()
  {
    
    this.settingsService.getSettings().subscribe(data => {
      console.log(data);
      this.settings = data;
    });

    this.authService.getUserInfo().subscribe(user => {
      this.user = user;
    });

  }

  public updateSessionInfo(time:string)
  {
    var date = Date.parse(this.session.date + ', ' + this.session.startTime);

    this.price = this.session.hours * this.settings[0].pricePerHour;
    this.session.endDate = new Date(date+(this.session.hours * 3600000)).toDateString();
    var sTime = this.toStandardTime(this.session.startTime); 
    this.session.endTime = this.toStandardTime(new Date(date+(this.session.hours * 3600000)).toTimeString());
    
    console.log(sTime);
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
        var sTime = this.toStandardTime(this.session.startTime);
        this.session.user = this.user.email;
        console.log(this.session);
    }
  }
}
