import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";

import { FirebaseDatabase } from "@angular/fire";
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { database } from 'firebase/app';

@Injectable()
export class DatabaseService {

    // database: FirebaseDatabase; cant find this type
        database: any;
     connectionState :  boolean = false;
     connectionSubject : any = true;

    constructor(private firebaseDatabase: AngularFireDatabaseModule) {
        this.connectionSubject = new BehaviorSubject<boolean>(true);
        this.database = database();
        this.monitorConnectionState();
    }

    //updates the connection state for the firebase 
    private monitorConnectionState() : void { 
        this.database.ref(".info/connected").on("value",(snapshot) => {
            this.connectionState = snapshot.val();
            this.connectionSubject.next(this.connectionState);
            
        });
    }

    private getUserKey(userUid: string) {
        return `users/${userUid}`;
    }

    private async _del(key: string): Promise<"OK"> {
        this.database.ref(key).set(null);
        return "OK";
    }

    public async delete(key: string): Promise<"OK"> {
        this.database.ref(key).set(null);
        return "OK";
    }
    private async _get(key: string): Promise<any> {
        const snapshot = await this.database.ref(key).once("value");
        return snapshot.val();
    }

    public getTimestamp() : any { 
        return database.ServerValue.TIMESTAMP;
    }
    
    private async _update(key: string, value: any): Promise<"OK"> {
        await this.database.ref(key).update(value);
        return "OK";
    }
    public async push(key: string, value: any): Promise<"OK"> {
        try {
            if(this.connectionState){
                await this.database.ref(key).push(value);
                return "OK";
            }
            // else
            //     throw new ErrorMessage("Connection failed, please try again."
            // );
        }
        catch(error){
            // throw new ErrorMessage(error.message, error);
        }
    }

    private async _set(key: string, value: any): Promise<"OK"> {
        await this.database.ref(key).set(value);
        return "OK";
    }



    public getConnectionState() : database.Reference {
        return  this.database.ref(".info/connected");
    }

    //data loader

    public async loadChunk(reference : string, query? : any) : Promise<any>{
        try{
            if(query.pointerIndex){
                const snapshot = await this.database.ref(reference).orderByKey().endAt(query.pointerIndex).limitToLast(11).once("value");
                return snapshot.val();
            }else{
                const snapshot = await this.database.ref(reference).orderByKey().limitToLast(10).once("value");
                return snapshot.val();
            }
        } catch(error){

        }
    }

    public async get(key: string): Promise<any> {
        return await this._get(key);
    }
}


