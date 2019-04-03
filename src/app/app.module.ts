import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { NavParams } from './services/nav-params.service';
import { NavigationService } from './services/navigation.service';

import { FormsModule  } from "@angular/forms";


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularMaterial } from './layout/angular-material.layout';


import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AngularFireModule } from '@angular/fire';
import { _firebaseConfig } from './config_';
import { components } from './routing/app-routes';
import { AuthGuard } from './routing/guards/authGuard';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { FooterComponent } from './component/footer/footer.component';
import { Services } from './services/services.export';
import { LoginGuard } from './routing/guards/loginGuard';
import { MainNavComponent } from './component/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { DashComponent } from './component/home/dash/dash.component';




@NgModule({
  declarations: [
    ...components,
    AppComponent,
    PagenotfoundComponent,
    FooterComponent,
    MainNavComponent,
    DashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ...AngularMaterial, //import all angular material modules,
    AngularFireModule.initializeApp(_firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    ...Services,
    NavParams,
    AuthGuard,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
