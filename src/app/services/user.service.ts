import { Injectable } from '@angular/core';
import { AngularFireAuth  } from '@angular/fire/auth';
import { resolve, reject, async } from 'q';

@Injectable()
export class UserService {
    uid: string;
    permissions: Array<string> = [];

    constructor(private authentication: AngularFireAuth ) { }

    public updatePermisson(user : any) { 
        this.uid = user.uid;
        this.permissions = user.permissions

        console.log(this);
        
    }

    public getState() : UserService {
        return this;
    }
}