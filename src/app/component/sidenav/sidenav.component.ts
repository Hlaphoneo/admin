import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private account : AccountService, private navigator: NavigationService) { }

  ngOnInit() {
  }

  async logout() { 
    await this.account.logout();
    this.navigator.goto('/login');
  }

}
