
import { NavController } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

export class Global {
  userObs: Observable<any>;
  constructor(public navCtrl: NavController, public af: AngularFireDatabase) {

  }

  pop()
  {
      this.navCtrl.pop();
  }

  getUserInfo()
  {
    this.userObs = new Observable(watcher => {
        firebase.auth().onAuthStateChanged(authData => {
            if(authData)
            {
                console.log(authData);
                this.af.list('/Users').valueChanges(['child_added']).subscribe(users => {
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
                watcher.next(0);
                watcher.complete();
            }
        });

    });

    return this.userObs;
  }

}