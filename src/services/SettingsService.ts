import {AngularFireDatabase} from 'angularfire2/database';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import * as firebase from 'firebase';
import { formDirectiveProvider } from '@angular/forms/src/directives/ng_form';
import { NavController } from 'ionic-angular';
import { Login } from '../pages/login/login';

@Injectable()

export class SettingsService
{

    constructor(public af: AngularFireDatabase)
    {

    }

    public getSettings() : Observable<{}[]> {
        return this.af.list("/Settings").valueChanges();
    }

    public updateSettings(obj:any, settingsData: any) : Promise<any>
    {
        return this.af.list("/Settings").update(obj, settingsData).then(()=>{

        });
    }

    public getSessionSettings(): Observable<{}[]> {
        return this.af.list("/SessionMgt").valueChanges();
    }
}