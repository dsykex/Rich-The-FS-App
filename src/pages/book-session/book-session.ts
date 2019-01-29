import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, Slide, NavOptions } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import { Global } from '../../app/global';
import { AuthService } from '../../services/AuthService';
import { SettingsService } from '../../services/SettingsService';

@Component({
  selector: 'page-book-session',
  templateUrl: 'book-session.html'
})

export class BookSession {

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
    console.log(Date.now());
    this.settingsService.getSettings().subscribe(data => {
      console.log(data);
      this.settings = data;
    });

    console.log(this.settings);
  }

  public updateSessionInfo(time:string)
  {
    if(this.session.hours > 0)
      this.price = this.session.hours * this.settings[0].pricePerHour;
    else
      this.session.hours = 0;

    var timeSplit = time.split(':');
    var hour = parseInt(timeSplit[0]);
    var minute = parseInt(timeSplit[1]);

    if(this.session.hours > 0)
    {
      hour = hour + parseInt(this.session.hours);
      
      if(hour > 24)
        hour = 0;
    }
    
    var timeConversion = hour + ':' + timeSplit[1];
  
    this.session.endTime = this.toStandardTime(timeConversion);
    console.log(this.session.endTime);
  }

  public toStandardTime(time: string)
  {
    var hours = Number(time[0]);
    var minutes = Number(time[1]);

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

    console.log(timeValue);
  }

  bookSession()
  {
    console.log(this.session);
    if(this.session.date && this.session.startTime && this.session.endTime && this.session.hours)
    {

    }
  }
}
