import { Component } from '@angular/core';
import { NavController, AlertController, AlertOptions } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';

import * as firebase from 'firebase';
import { Home } from '../home/home';
import {AuthService} from '../../services/AuthService';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class Login {

  user: any = {};
  loginError: any;
  myBool: any;
  constructor(public authService: AuthService, public navCtrl: NavController, public af: AngularFireDatabase, public alertCtrl: AlertController)
  {
    this.myBool = false;
    console.log(this.myBool);
  }

  errorHdr(msg, time)
  {
    this.loginError = msg;

    setTimeout(()=>{
      this.loginError = false;
    },time);
  }

  ngOnInit()
  {
    
  }

  login()
  {
    console.log(this.user);
    if(this.user['email'] && this.user['password'])
    {
      firebase.auth().signInWithEmailAndPassword(this.user.email,this.user.password).then(() =>{
        this.navCtrl.setRoot(Home);
      }).catch(()=>
      {
        this.errorHdr("Login failed. Ensure that the credentials are correct and your network is established.", 5000)
      });
    }
    else
    {
      this.errorHdr("Credential fields cannot be empty", 4000);
    }
  }

  signup()
  {
    let alert = this.alertCtrl.create({
      message: '',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'email',
          placeholder: 'Email'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        },
        {
          name: 'confirmPassword',
          placeholder: 'Confirm Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',

          role: 'cancel',
          handler: data => {
           
          }
        },
        {
          text: 'Confirm Account',
          handler: data => {
            console.log(data);
            
            if(data.name && data.email && data.password && data.confirmPassword)
            {
              if(data.password == data.confirmPassword)
              {
                //console.log('AWESOME');
                
                let usersSub = this.af.list("/Users").valueChanges(['child_added']).subscribe(users => {
                  let user  = null;
                  console.log(users);
                  if(users)
                  {
                    user = users.filter(u => { return u['email'] == data.email })[0];
                    console.log(user);
                  }

                  if(!user)
                  {
                    user = data;
                    user.createdAt = Date.now();
                    user.confirmPassword = null;
                 
                    firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(() => {
                      this.af.list("/Users").push(user);
                      usersSub.unsubscribe();
                      firebase.auth().signInWithEmailAndPassword(data.email,data.password).then(() => {                      
                        this.navCtrl.setRoot(Home);
                      });
                    }).catch(() => {
                      this.errorHdr("An error occured while processing your account. Make sure that your email is formatted correctly and password is 6 characters or more.",7000);
                    });
                  }else
                  {
                    this.errorHdr("Account already exists under that email.", 5000);
                  }
                });
              }else
              {
                this.errorHdr("Passwords do not match.",2000);

              }
            }
          }
        }
      ]
    });
    alert.present();
  }

}
