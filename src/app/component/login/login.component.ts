import { Component, OnInit } from '@angular/core';
import { LoginCreds } from '../../types/types.interfaces';
import { isEmail, _isEmail } from '../../utils/email-regex';
import { AccountService } from '../../services/account.service';
import { MatSnackBar } from '@angular/material';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData : LoginCreds = {
    username : "",
    password : ""
  }

  errorMessage : string;


  constructor(private account : AccountService,
    private snackBar: MatSnackBar,
    private navigator : NavigationService) { 
  }

  private async login() { 

    this.errorMessage = '';
    if(this.validate()) { 
      try{
        await this.account.login(this.loginData);
        this.navigator.goto('/home')
        
      }
      catch(error){
        this.openSnackBar(error,"");
      }
        
    } else { 
      this.errorMessage = "Email is badly formatted";
    }
  }

  private validate() : void { 
    return _isEmail(this.loginData.username);
  }

  private openSnackBar(message: string, action: string) : void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
