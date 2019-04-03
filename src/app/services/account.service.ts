import { Injectable } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import { User } from "firebase";
import { LoginCreds } from "../types/types.interfaces";


@Injectable()

export class AccountService { 

    user        : any; 
    systemInfo  : any;

    constructor(private auth : AuthenticationService){ }

    public async login(_login : LoginCreds) : Promise<boolean> { 
        return new Promise<boolean>(async (resolve,reject)=>{
            try{
                await this.auth.login(_login);
                resolve(true)
            }
            catch(error){
                console.log(error);
                
                reject(error);
            }

        })
    }

    public async loggedIn() : Promise<boolean> { 
        return await this.auth.loggedin();
    }

    public async logout() : Promise<boolean> { 
        return new Promise<boolean>((resolve,reject)=>{
            try{
                this.auth.logout();
                resolve(true)
            }
            catch(error){
                //nothing happens as of yet.
            }
        })
    }
}