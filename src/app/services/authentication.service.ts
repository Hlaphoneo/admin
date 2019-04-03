import { Injectable } from '@angular/core';
import { AngularFireAuth  } from '@angular/fire/auth';
import { resolve, reject, async } from 'q';
import { DatabaseService } from './database.service';
import { UserService } from './user.service';
import { FirebaseError } from 'firebase';

@Injectable()
export class AuthenticationService {
 
    constructor(private authentication: AngularFireAuth, private database: DatabaseService, private user: UserService ) {

    }

    public async login(cred: any) {
        console.log(cred);
        
        await this.authentication.auth.signInWithEmailAndPassword(cred.username,cred.password)
        .then((value)=>{
            console.log(value);
            
        })
        .catch((error)=>{
            throw this.parseErrorCode(error);
        })
    }


    private parseErrorCode(error : FirebaseError) : string {
        console.log(error.code);
        
        switch (error.code) {
            case "auth/user-not-found":
                    return "Email not registered, please try again.";
            
            case "auth/wrong-password":
                    return "Wrong password, please try again.";
            
            case "auth/too-many-requests":
                    return "Account locked, please try again after a while.";
        
            default:
                break;
        }
    }


    public async logout() { 
        return await new Promise<boolean>(async (resolve,reject)=>{
             this.authentication.auth.signOut().then(()=>{
                resolve(true)
            }).catch((error)=>{
                resolve(false);
            })
        })
    }

    public async loggedin() {
        return await new Promise<boolean>((resolve,reject)=>{
            this.authentication.auth.onAuthStateChanged(async (user)=>{
                if(user){
                    console.log(`admins/${user.uid}`);
                    
                    let perms = await this.database.get(`admins/${user.uid}/perms`);
                    console.log(perms);
                    
                    let perms_ = null;
                    if(perms){ perms_ = Object.keys(perms) }
                    else { 
                        perms_ = [];
                    }
                    this.user.updatePermisson({
                        uid : user.uid,
                        permissions : perms_
                    })

                    console.log(this.user);
                    
                    resolve(true)
                }
                else { 
                    resolve(false)
                }
            })
        })
    }

    public getAuth() { 
        return this.authentication.auth;
    }
}

