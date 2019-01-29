import {AngularFireDatabase} from 'angularfire2/database';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import * as firebase from 'firebase';
import { formDirectiveProvider } from '@angular/forms/src/directives/ng_form';
import { NavController } from 'ionic-angular';
import { Login } from '../pages/login/login';

@Injectable()

export class AuthService {
    userObs: Observable<any>;
    constructor(public af: AngularFireDatabase)
    {

    }

    getUserInfo() : Observable<any>
    {
      this.userObs = new Observable(watcher => {
          firebase.auth().onAuthStateChanged(authData => {
              if(authData)
              {
                  console.log(authData);
                  this.af.list('/Users').valueChanges().subscribe(users => {
                      if(users)
                      {
                          let user = users.filter(u => {return u['email'] == authData.email})[0];
                            
                          if(user)
                          {
                           
                            watcher.next(user);
                          
                            watcher.complete();
                          }
                          else
                          {
                              let newUser = {
                                  email: authData.email,
                                  name: authData.displayName,
                                  createdAt: Date.now(),
                                  rank:'m'
                              }
                             
                              watcher.next(newUser);
                              this.af.list('/Users').push(newUser);
                              watcher.complete();
                          }
                      }
                  })
              }else{
                  watcher.next({});
                  watcher.complete();
              }
          });
  
      });
  
      return this.userObs;
    }

    public isAdmin(user)
    {
        return (user.rank == 'a');
    }

    public logout() : Promise<any>
    {
       return firebase.auth().signOut();
    }

}